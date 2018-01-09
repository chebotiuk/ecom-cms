<h1>{{{ title }}}</h1>
<p>Welcome to {{{ title }}}</p>

{{# if condition }}
	Condition is true
{{ else }}
	Condition is false
{{/if}}

<br>

<ul>
{{# each listArr as |val key|}}
	<li>{{ key }} : {{ val }}</li>
{{/each}}
</ul>
