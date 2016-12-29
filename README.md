<h1>Free Code Camp Microservice: URL Shortener</h1>
<p class="intro">User stories:</p>

<ul>
    <li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</li>
    <li>When I visit that shortened URL, it will redirect me to my original link.</li>
</ul>
<p>Example creation usage:</p>
<code>https://jc-fcc-url-shortener.herokuapp.com/smash/https://www.google.com</code>
<code>https://jc-fcc-url-shortener.herokuapp.com/smash/http://jordancarney.com</code>
<p>Example creation output</p>
<code>{<br>
  "shortUrl":"https://jc-fcc-url-shortener.herokuapp.com/zvvyp",<br>
  "longUrl":"http://jordancarney.com",<br>
  "shortId":"zvvyp"<br>
}</code>
<h2>To use a shortened URL:</h2>
<code>https://jc-fcc-url-shortener.herokuapp.com/d9doy</code>
<p>...will redirect to...</p>
<code>https://www.google.com/</code>
