// JavaScript Document

(function(){

const lang = document.querySelector('meta[http-equiv="content-language"]').getAttribute('content');

// English Suite menu.
const suiteListEn =  (function(){/*
<ul>
  <li class="exastro"><a href="https://www.exastro.org/index_en.html">Exastro Home</a></li>
  <li class="ita"><a href="/it-automation-docs/index.html">IT Automation</a></li>
  <li class="pc"><a href="https://github.com/exastro-suite/playbook-collection-docs/blob/master/README.md" target="_blank" rel="noopener">Playbook Collection</a></li>
  <li class="oase"><a href="/oase-docs/index.html">Operation Autonomy Support Engine</a></li>
  <li class="epoch"><a href="/epoch-docs/index.html">EPOCH</a></li>
</ul>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

// Japanese Suite menu.
const suiteListJa =  (function(){/*
<ul>
  <li class="exastro"><a href="https://www.exastro.org/">Exastro Home</a></li>
  <li class="ita"><a href="/it-automation-docs/index_ja.html">IT Automation</a></li>
  <li class="pc"><a href="https://github.com/exastro-suite/playbook-collection-docs/blob/master/README.ja.md" target="_blank" rel="noopener">Playbook Collection</a></li>
  <li class="oase"><a href="/oase-docs/index_ja.html">Operation Autonomy Support Engine</a></li>
  <li class="epoch"><a href="/epoch-docs/index_ja.html">EPOCH</a></li>
</ul>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

if ( lang === 'en') {
  document.write( suiteListEn );
} else if ( lang === 'ja') {
  document.write( suiteListJa );
}

}())