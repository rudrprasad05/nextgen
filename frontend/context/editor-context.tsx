"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  ElementNode,
  ElementStyles,
  ElementType,
  PageSchema,
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

function findElementById(root: ElementNode, id: string): ElementNode | null {
  if (root.id === id) return root;
  if (!root.children) return null;

  for (const child of root.children) {
    const found = findElementById(child, id);
    if (found) return found;
  }
  return null;
}

type ElementUpdate =
  | { styles?: ElementStyles }
  | { props?: Record<string, unknown> };

function updateElementInTree(
  node: ElementNode,
  id: string,
  updates: ElementUpdate,
): ElementNode {
  if (node.id === id) {
    return {
      ...node,
      props:
        "props" in updates ? { ...node.props, ...updates.props } : node.props,
      styles:
        "styles" in updates
          ? { ...node.styles, ...updates.styles }
          : node.styles,
    };
  }

  if (!node.children || node.children.length === 0) {
    return node;
  }

  let didChange = false;

  const newChildren = node.children.map((child) => {
    const updated = updateElementInTree(child, id, updates);
    if (updated !== child) didChange = true;
    return updated;
  });

  return didChange ? { ...node, children: newChildren } : node;
}

function deleteElementFromTree(node: ElementNode, id: string): ElementNode {
  if (!node.children) return node;

  return {
    ...node,
    children: node.children
      .filter((child) => child.id !== id)
      .map((child) => deleteElementFromTree(child, id)),
  };
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

function canDeleteElement(element: ElementNode) {
  return element.type !== "body";
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

const DEFAULT_SCHEMA: PageSchema = {
  root: {
    id: "body",
    type: "body",
    props: {},
    styles: {
      background: "#ffffff",
      padding: "24px",
      color: "#000",
    },
    children: [],
  },
  meta: {
    title: "New Website",
    description: "New website",
  },
};

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
        children: type === "section" ? ([] as ElementNode[]) : undefined,
      };

      setSchema((prev) => {
        const targetParent = parentId
          ? findElementById(prev.root, parentId)
          : prev.root;

        if (!targetParent) return prev;

        const insert = (node: ElementNode): ElementNode => {
          if (node.id === targetParent.id) {
            return {
              ...node,
              children: [...(node.children || []), newElement],
            };
          }

          if (!node.children) return node;

          return {
            ...node,
            children: node.children.map(insert),
          };
        };

        return { ...prev, root: insert(prev.root) };
      });

      setSelectedId(newElement.id);
    },
    [],
  );

  const updateElement = useCallback(
    (id: string, updates: Partial<Pick<ElementNode, "props" | "styles">>) => {
      setSchema((prev) => ({
        ...prev,
        root: updateElementInTree(prev.root, id, updates),
      }));
    },
    [],
  );

  const deleteElement = useCallback((id: string) => {
    if (id === "body") return;

    setSchema((prev) => ({
      ...prev,
      root: deleteElementFromTree(prev.root, id),
    }));

    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const moveElement = useCallback(
    (activeId: string, overId: string, parentId?: string | null) => {
      if (activeId === "body") return;

      setSchema((prev) => {
        if (!prev.root.children) return prev;

        const { elements: cleanedChildren, removed } = removeElementFromTree(
          prev.root.children,
          activeId,
        );

        if (!removed) return prev;

        const updatedChildren =
          parentId === undefined || parentId === "body"
            ? insertElementAtIndex(cleanedChildren, removed, overId, null)
            : insertElementAtIndex(cleanedChildren, removed, overId, parentId);

        return {
          ...prev,
          root: {
            ...prev.root,
            children: updatedChildren,
          },
        };
      });
    },
    [],
  );

  const getElement = useCallback(
    (id: string) => findElementById(schema.root, id),
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
