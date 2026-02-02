"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type {
  PageSchema,
  ElementNode,
  ElementType,
  ElementStyles,
  ViewportMode,
} from "../lib/page-builder/types";
import { DEFAULT_PROPS, DEFAULT_STYLES } from "../lib/page-builder/types";

const STORAGE_KEY = "page-builder-schema";

interface EditorContextType {
  schema: PageSchema;
  selectedId: string | null;
  changeViewportMode: (mode: ViewportMode) => void;
  viewportMode: ViewportMode;
  setSelectedId: (id: string | null) => void;
  addElement: (type: ElementType, parentId?: string | null) => void;
  updateElement: (
    id: string,
    updates: Partial<Pick<ElementNode, "props" | "styles">>,
  ) => void;
  deleteElement: (id: string) => void;
  moveElement: (
    activeId: string,
    overId: string,
    parentId?: string | null,
  ) => void;
  getElement: (id: string) => ElementNode | null;
  resetSchema: () => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within EditorProvider");
  }
  return context;
}

function generateId(): string {
  return `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function findElementById(
  elements: ElementNode[],
  id: string,
): ElementNode | null {
  for (const el of elements) {
    if (el.id === id) return el;
    if (el.children) {
      const found = findElementById(el.children, id);
      if (found) return found;
    }
  }
  return null;
}

function updateElementInTree(
  elements: ElementNode[],
  id: string,
  updates: Partial<Pick<ElementNode, "props" | "styles">>,
): ElementNode[] {
  return elements.map((el) => {
    if (el.id === id) {
      return {
        ...el,
        props: { ...el.props, ...updates.props },
        styles: { ...el.styles, ...updates.styles },
      };
    }
    if (el.children) {
      return { ...el, children: updateElementInTree(el.children, id, updates) };
    }
    return el;
  });
}

function deleteElementFromTree(
  elements: ElementNode[],
  id: string,
): ElementNode[] {
  return elements
    .filter((el) => el.id !== id)
    .map((el) => {
      if (el.children) {
        return { ...el, children: deleteElementFromTree(el.children, id) };
      }
      return el;
    });
}

function removeElementFromTree(
  elements: ElementNode[],
  id: string,
): { elements: ElementNode[]; removed: ElementNode | null } {
  let removed: ElementNode | null = null;

  const filter = (els: ElementNode[]): ElementNode[] => {
    return els.reduce((acc: ElementNode[], el) => {
      if (el.id === id) {
        removed = el;
        return acc;
      }
      if (el.children) {
        const newChildren = filter(el.children);
        if (removed) {
          return [...acc, { ...el, children: newChildren }];
        }
        return [...acc, { ...el, children: newChildren }];
      }
      return [...acc, el];
    }, []);
  };

  return { elements: filter(elements), removed };
}

function insertElementAtIndex(
  elements: ElementNode[],
  element: ElementNode,
  targetId: string,
  parentId: string | null,
): ElementNode[] {
  if (!parentId) {
    const targetIndex = elements.findIndex((el) => el.id === targetId);
    if (targetIndex === -1) {
      return [...elements, element];
    }
    const newElements = [...elements];
    newElements.splice(targetIndex, 0, element);
    return newElements;
  }

  return elements.map((el) => {
    if (el.id === parentId && el.children) {
      const targetIndex = el.children.findIndex(
        (child) => child.id === targetId,
      );
      if (targetIndex === -1) {
        return { ...el, children: [...el.children, element] };
      }
      const newChildren = [...el.children];
      newChildren.splice(targetIndex, 0, element);
      return { ...el, children: newChildren };
    }
    if (el.children) {
      return {
        ...el,
        children: insertElementAtIndex(
          el.children,
          element,
          targetId,
          parentId,
        ),
      };
    }
    return el;
  });
}

function addElementToParent(
  elements: ElementNode[],
  element: ElementNode,
  parentId: string,
): ElementNode[] {
  return elements.map((el) => {
    if (el.id === parentId) {
      return { ...el, children: [...(el.children || []), element] };
    }
    if (el.children) {
      return {
        ...el,
        children: addElementToParent(el.children, element, parentId),
      };
    }
    return el;
  });
}

const DEFAULT_SCHEMA: PageSchema = { elements: [] };

export function EditorProvider({ children }: { children: ReactNode }) {
  const [schema, setSchema] = useState<PageSchema>(DEFAULT_SCHEMA);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSchema(JSON.parse(stored));
      } catch {
        setSchema(DEFAULT_SCHEMA);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
    }
  }, [schema, isLoaded]);

  const changeViewportMode = useCallback((mode: ViewportMode) => {
    setViewportMode(mode);
  }, []);

  const addElement = useCallback(
    (type: ElementType, parentId?: string | null) => {
      const newElement: ElementNode = {
        id: generateId(),
        type,
        props: { ...DEFAULT_PROPS[type] },
        styles: { ...DEFAULT_STYLES[type] },
        children: type === "section" ? [] : undefined,
      };

      setSchema((prev) => {
        if (parentId) {
          return {
            elements: addElementToParent(prev.elements, newElement, parentId),
          };
        }
        return { elements: [...prev.elements, newElement] };
      });

      setSelectedId(newElement.id);
    },
    [],
  );

  const updateElement = useCallback(
    (id: string, updates: Partial<Pick<ElementNode, "props" | "styles">>) => {
      setSchema((prev) => ({
        elements: updateElementInTree(prev.elements, id, updates),
      }));
    },
    [],
  );

  const deleteElement = useCallback((id: string) => {
    setSchema((prev) => ({
      elements: deleteElementFromTree(prev.elements, id),
    }));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const moveElement = useCallback(
    (activeId: string, overId: string, parentId?: string | null) => {
      setSchema((prev) => {
        const { elements, removed } = removeElementFromTree(
          prev.elements,
          activeId,
        );
        if (!removed) return prev;

        if (parentId === undefined) {
          return {
            elements: insertElementAtIndex(elements, removed, overId, null),
          };
        }

        return {
          elements: insertElementAtIndex(elements, removed, overId, parentId),
        };
      });
    },
    [],
  );

  const getElement = useCallback(
    (id: string): ElementNode | null => {
      return findElementById(schema.elements, id);
    },
    [schema],
  );

  const resetSchema = useCallback(() => {
    setSchema(DEFAULT_SCHEMA);
    setSelectedId(null);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <EditorContext.Provider
      value={{
        schema,
        selectedId,
        setSelectedId,
        changeViewportMode,
        viewportMode,
        addElement,
        updateElement,
        deleteElement,
        moveElement,
        getElement,
        resetSchema,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
