var documenterSearchIndex = {"docs":
[{"location":"#RuntimeGeneratedFunctions.jl","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl","text":"","category":"section"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"(Image: Join the chat at https://julialang.zulipchat.com #sciml-bridged) (Image: Global Docs)","category":"page"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"(Image: codecov) (Image: Build Status)","category":"page"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"(Image: ColPrac: Contributor's Guide on Collaborative Practices for Community Packages) (Image: SciML Code Style)","category":"page"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"RuntimeGeneratedFunctions are functions generated at runtime without world-age issues and with the full performance of a standard Julia anonymous function. This builds functions in a way that avoids eval.","category":"page"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"Note that RuntimeGeneratedFunction does not handle closures. Please use the GeneralizedGenerated.jl package for more fixable staged programming. While GeneralizedGenerated.jl is more powerful, RuntimeGeneratedFunctions.jl handles large expressions better.","category":"page"},{"location":"#Simple-Example","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"Simple Example","text":"","category":"section"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"Here's an example showing how to construct and immediately call a runtime generated function:","category":"page"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"using RuntimeGeneratedFunctions\nRuntimeGeneratedFunctions.init(@__MODULE__)\n\nfunction no_worldage()\n    ex = :(function f(_du,_u,_p,_t)\n        @inbounds _du[1] = _u[1]\n        @inbounds _du[2] = _u[2]\n        nothing\n    end)\n    f1 = @RuntimeGeneratedFunction(ex)\n    du = rand(2)\n    u = rand(2)\n    p = nothing\n    t = nothing\n    f1(du,u,p,t)\nend\nno_worldage()","category":"page"},{"location":"#Changing-how-global-symbols-are-looked-up","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"Changing how global symbols are looked up","text":"","category":"section"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"If you want to use helper functions or global variables from a different module within your function expression you'll need to pass a context_module to the @RuntimeGeneratedFunction constructor. For example","category":"page"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"RuntimeGeneratedFunctions.init(@__MODULE__)\n\nmodule A\n    using RuntimeGeneratedFunctions\n    RuntimeGeneratedFunctions.init(A)\n    helper_function(x) = x + 1\nend\n\nfunction g()\n    expression = :(f(x) = helper_function(x))\n    # context module is `A` so that `helper_function` can be found.\n    f = @RuntimeGeneratedFunction(A, expression)\n    @show f(1)\nend","category":"page"},{"location":"#Precompilation-and-setting-the-function-expression-cache","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"Precompilation and setting the function expression cache","text":"","category":"section"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"For technical reasons RuntimeGeneratedFunctions needs to cache the function expression in a global variable within some module. This is normally transparent to the user, but if the RuntimeGeneratedFunction is evaluated during module precompilation, the cache module must be explicitly set to the module currently being precompiled. This is relevant for helper functions in some module which construct a RuntimeGeneratedFunction on behalf of the user. For example, in the following code, any third party user of HelperModule.construct_rgf() user needs to pass their own module as the cache_module if they want the returned function to work after precompilation:","category":"page"},{"location":"","page":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","title":"RuntimeGeneratedFunctions.jl: Efficient Staged Compilation","text":"RuntimeGeneratedFunctions.init(@__MODULE__)\n\n# Imagine HelperModule is in a separate package and will be precompiled\n# separately.\nmodule HelperModule\n    using RuntimeGeneratedFunctions\n    RuntimeGeneratedFunctions.init(HelperModule)\n\n    function construct_rgf(cache_module, context_module, ex)\n        ex = :((x)->$ex^2 + x)\n        RuntimeGeneratedFunction(cache_module, context_module, ex)\n    end\nend\n\nfunction g()\n    ex = :(x + 1)\n    # Here cache_module is set to the module currently being compiled so that\n    # the returned RGF works with Julia's module precompilation system.\n    HelperModule.construct_rgf(@__MODULE__, @__MODULE__, ex)\nend\n\nf = g()\n@show f(1)","category":"page"}]
}
