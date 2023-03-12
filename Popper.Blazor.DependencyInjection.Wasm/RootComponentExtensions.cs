using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace Popper.Blazor.DependencyInjection.Wasm;

public static class RootComponentMappingCollectionExtensions
{
    public static void AddPoppers(this WebAssemblyHostBuilder hostBuilder)
    {
        hostBuilder.RootComponents.Add<PopperOutlet>("body::after");
        hostBuilder.Services.AddPoppers();
    }
}