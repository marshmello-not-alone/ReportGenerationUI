const GenerateLoading = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
    <h3 className="text-lg font-medium mb-2">
      Sending request to generate your report...
    </h3>
    <p className="text-sm text-muted-foreground text-center">
      This may take a few moments
    </p>
  </div>
);

export default GenerateLoading;
