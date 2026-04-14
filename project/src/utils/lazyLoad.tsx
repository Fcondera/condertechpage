import { lazy, Suspense, ReactNode } from "react";

// Componente de carregamento
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-spotify-green border-t-transparent"></div>
  </div>
);

// Wrapper para lazy loading
export const withLazySuspense = (
  Component: React.LazyExoticComponent<() => ReactNode>,
) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

// Lazy load das páginas
export const AboutPage = lazy(() => import("@views/AboutPage"));
export const EstoquePage = lazy(() => import("@views/EstoquePage"));
export const EcommercePage = lazy(() => import("@views/EcommercePage"));
export const LandingPageMock = lazy(() => import("@views/LandingPageMock"));
export const UiUxPage = lazy(() => import("@views/UiUxPage"));
export const SistemaInternoPage = lazy(
  () => import("@views/SistemaInternoPage"),
);
export const PlataformaEnsinoPage = lazy(
  () => import("@views/PlataformaEnsinoPage"),
);
export const SistemaPedidosPage = lazy(
  () => import("@views/SistemaPedidosPage"),
);
