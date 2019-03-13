<pre>
@php
    return var_dump(\App\Article::where('id', 2)->first()->delete(), true);
@endphp