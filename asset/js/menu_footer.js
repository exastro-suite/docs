// JavaScript Document

(function(){

const lang = document.querySelector('meta[http-equiv="content-language"]').getAttribute('content');

// English footer menu.
const footerMenuEn =  (function(){/*
<ul id="footerMainMenu">
  <li id="footerExastro">
    <div class="footerMainMenuHome">
      <a href="https://www.exastro.org/index_en.html"><img src="/docs/asset/img/exastro_logotype.svg" alt="Exastro"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="https://www.exastro.org/index_en.html">Home</a></li>
      <li><a href="https://www.exastro.org/newsroom_en.html">News Room</a></li>
      <li><a href="https://www.exastro.org/asset_en.html">Asset</a></li>
    </ul>
  </li>
  <li id="footerIta">
    <div class="footerMainMenuHome">
      <a href="/it-automation-docs/index.html"><img src="/it-automation-docs/asset/img/ita.svg" alt="IT Automation"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="/it-automation-docs/index.html" class="home">Home</a></li>
      <li><a href="/it-automation-docs/overview.html" class="overview">Overview</a></li>
      <li><a href="/it-automation-docs/install.html" class="install">Install</a></li>
      <li><a href="/it-automation-docs/learn.html" class="learn">Learn</a></li>
      <li><a href="/it-automation-docs/case.html" class="case">Case</a></li>
      <li><a href="/it-automation-docs/documents.html" class="documents">Documents</a></li>
      <li><a href="/it-automation-docs/faq.html" class="faq">FAQ</a></li>
    </ul>
  </li>
  <li id="footerOase">
    <div class="footerMainMenuHome">
      <a href="/oase-docs/index.html"><img src="/oase-docs/asset/img/oase.svg" alt="OASE | Operation Autonomy Support Engine"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="/oase-docs/index.html" class="home">Home</a></li>
      <li><a href="/oase-docs/overview.html" class="overview">Overview</a></li>
      <li><a href="/oase-docs/learn.html" class="learn">Learn</a></li>
      <li><a href="/oase-docs/case.html" class="case">Case</a></li>
      <li><a href="/oase-docs/documents.html" class="documents">Documents</a></li>
      <li><a href="/oase-docs/downloads.html" class="downloads">Downloads</a></li>
      <li><a href="/oase-docs/faq.html" class="faq">FAQ</a></li>
    </ul>
  </li>
  <li id="footerEpoch">
    <div class="footerMainMenuHome">
      <a href="/epoch-docs/index.html"><img src="/epoch-docs/asset/img/epoch.svg" alt="EPOCH"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="/epoch-docs/index.html" class="home">Home</a></li>
      <li><a href="/epoch-docs/overview.html" class="overview">Overview</a></li>
      <li><a href="/epoch-docs/learn.html" class="learn">Learn</a></li>
      <li><a href="/epoch-docs/reference.html" class="reference">Reference</a></li>
      <li><a href="/epoch-docs/downloads.html" class="downloads">Downloads</a></li>
      <li><a href="/epoch-docs/faq.html" class="faq">FAQ</a></li>
    </ul>
  </li>
</ul>
<ul id="footerSubMenu">
  <li><a href="https://twitter.com/ExastroSuite" class="twitter" target="_blank" rel="noopener"><i class="fab fa-twitter-square"></i></a><span>Twitter</span></li>
  <li><a href="https://www.facebook.com/ExastroSuite/" class="facebook" target="_blank" rel="noopener"><i class="fab fa-facebook-square"></i></a><span>facebook</span></li>
  <li><a href="https://www.youtube.com/channel/UC-kwQiXQfmYXTPbrGR-8qxw" class="youtube" target="_blank" rel="noopener"><i class="fab fa-youtube-square"></i></a><span>YouTube</span></li>
  <li><a href="https://github.com/exastro-suite" class="github" target="_blank" rel="noopener"><i class="fab fa-github-square"></i></a><span>GitHub</span></li>
</ul>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

// Japanese footer menu.
const footerMenuJa =  (function(){/*
<ul id="footerMainMenu">
  <li id="footerExastro">
    <div class="footerMainMenuHome">
      <a href="https://www.exastro.org/"><img src="/docs/asset/img/exastro_logotype.svg" alt="Exastro"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="https://www.exastro.org/">Home</a></li>
      <li><a href="https://www.exastro.org/newsroom.html">News Room</a></li>
      <li><a href="https://www.exastro.org/event.html">Event</a></li>
      <li><a href="https://www.exastro.org/asset.html">Asset</a></li>
    </ul>
  </li>
  <li id="footerIta">
    <div class="footerMainMenuHome">
      <a href="/it-automation-docs/index_ja.html"><img src="/it-automation-docs/asset/img/ita.svg" alt="IT Automation"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="/it-automation-docs/index_ja.html" class="home">Home</a></li>
      <li><a href="/it-automation-docs/overview_ja.html" class="overview">Overview</a></li>
      <li><a href="/it-automation-docs/install_ja.html" class="install">Install</a></li>
      <li><a href="/it-automation-docs/learn_ja.html" class="learn">Learn</a></li>
      <li><a href="/it-automation-docs/webinar_ja.html" class="webinar">Webinar</a></li>
      <li><a href="/it-automation-docs/case_ja.html" class="case">Case</a></li>
      <li><a href="/it-automation-docs/documents_ja.html" class="documents">Documents</a></li>
      <li><a href="/it-automation-docs/setting-samples_ja.html" class="setting-samples">Setting samples</a></li>
      <li><a href="/it-automation-docs/faq_ja.html" class="faq">FAQ</a></li>
    </ul>
  </li>
  <li id="footerOase">
    <div class="footerMainMenuHome">
      <a href="/oase-docs/index_ja.html"><img src="/oase-docs/asset/img/oase.svg" alt="OASE | Operation Autonomy Support Engine"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="/oase-docs/index_ja.html" class="home">Home</a></li>
      <li><a href="/oase-docs/overview_ja.html" class="overview">Overview</a></li>
      <li><a href="/oase-docs/learn_ja.html" class="learn">Learn</a></li>
      <li><a href="/oase-docs/webinar_ja.html" class="webinar">Webinar</a></li>
      <li><a href="/oase-docs/case_ja.html" class="case">Case</a></li>
      <li><a href="/oase-docs/documents_ja.html" class="documents">Documents</a></li>
      <li><a href="/oase-docs/downloads_ja.html" class="downloads">Downloads</a></li>
      <li><a href="/oase-docs/faq_ja.html" class="faq">FAQ</a></li>
    </ul>
  </li>
  <li id="footerEpoch">
    <div class="footerMainMenuHome">
      <a href="/epoch-docs/index_ja.html"><img src="/epoch-docs/asset/img/epoch.svg" alt="EPOCH"></a>
    </div>
    <ul class="footerMainMenuChildren">
      <li><a href="/epoch-docs/index_ja.html" class="home">Home</a></li>
      <li><a href="/epoch-docs/overview_ja.html" class="overview">Overview</a></li>
      <li><a href="/epoch-docs/learn_ja.html" class="learn">Learn</a></li>
      <li><a href="/epoch-docs/webinar_ja.html" class="learn">Webinar</a></li>
      <li><a href="/epoch-docs/reference_ja.html" class="reference">Reference</a></li>
      <li><a href="/epoch-docs/downloads_ja.html" class="downloads">Downloads</a></li>
      <li><a href="/epoch-docs/faq_ja.html" class="faq">FAQ</a></li>
    </ul>
  </li>
</ul>
<ul id="footerSubMenu">
  <li><a href="https://twitter.com/ExastroSuite" class="twitter" target="_blank" rel="noopener"><i class="fab fa-twitter-square"></i></a><span>Twitter</span></li>
  <li><a href="https://www.facebook.com/ExastroSuite/" class="facebook" target="_blank" rel="noopener"><i class="fab fa-facebook-square"></i></a><span>facebook</span></li>
  <li><a href="https://www.youtube.com/channel/UC-kwQiXQfmYXTPbrGR-8qxw" class="youtube" target="_blank" rel="noopener"><i class="fab fa-youtube-square"></i></a><span>YouTube</span></li>
  <li><a href="https://github.com/exastro-suite" class="github" target="_blank" rel="noopener"><i class="fab fa-github-square"></i></a><span>GitHub</span></li>
</ul>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

if ( lang === 'en') {
  document.write( footerMenuEn );
} else if ( lang === 'ja') {
  document.write( footerMenuJa );
}

}())