{{  Form::open(['action' => 'Admin\FileController@create', 'files' => true]) }}
{{ Form::file('photo') }}
{{ Form::submit() }}
{{ Form::close() }}