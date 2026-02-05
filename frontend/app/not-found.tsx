import { ErrorPage } from "@/components/errors/error-page";

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved. Check the URL or navigate back to the home page."
      showHomeButton
      showBackButton
    />
  );
}
