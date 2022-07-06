import React from "react";

const dynamic = (factory: () => Promise<{
  default: React.ComponentType<any>;
}>) => {
  const Component = React.lazy(factory);
  return (
    <React.Suspense fallback={<>...</>}>
      <Component />
    </React.Suspense>
  );
};

export default dynamic;