function showToast(msg){
  var toast = document.getElementById('toast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2600);
}

function currentWordSlug(){
  var input = document.getElementById('wordInput');
  var val = (input ? input.value.trim() : '') || 'ambigram';
  return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'ambigram';
}

function loadHtml2Canvas(cb){
  if(window.html2canvas){ cb(); return; }
  showToast('Preparing download…');
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  s.onload = cb;
  s.onerror = function(){ showToast('Could not load the download tool. Please try again.'); };
  document.head.appendChild(s);
}

function downloadPNG(){
  var stage = document.querySelector('.mirror-stage');
  if(!stage){ return; }
  loadHtml2Canvas(function(){
  html2canvas(stage, { backgroundColor: null, scale: 2 }).then(function(canvas){
    var link = document.createElement('a');
    link.download = 'ambigram-' + currentWordSlug() + '.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('PNG downloaded.');
  }).catch(function(){
    showToast('Could not generate the image. Please try again.');
  });
  });
}

function shareAmbigram(){
  var word = (document.getElementById('wordInput') ? document.getElementById('wordInput').value.trim() : '') || 'ambigram';
  var shareData = {
    title: 'Ambigram Generator',
    text: 'Check out this "' + word + '" ambigram I made!',
    url: window.location.href.split('#')[0]
  };
  if(navigator.share){
    navigator.share(shareData).catch(function(){});
  } else if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(shareData.url).then(function(){
      showToast('Link copied to clipboard!');
    }).catch(function(){
      showToast(shareData.url);
    });
  } else {
    window.prompt('Copy this link to share:', shareData.url);
  }
}

function renderWord(){
  var input = document.getElementById('wordInput');
  var val = (input ? input.value.trim() : '') || 'AMBIGRAM';
  var top = document.getElementById('wordTop');
  var bottom = document.getElementById('wordBottom');
  if(top) top.textContent = val;
  if(bottom) bottom.textContent = val;
}

function setStyle(name, el){
  document.querySelectorAll('.pill').forEach(function(p){
    p.classList.remove('active');
    if(!el && p.textContent.trim() === name) p.classList.add('active');
  });
  if(el) el.classList.add('active');
  var sel = document.getElementById('styleSelect');
  if(sel) sel.value = name;
  var map = {
    'Modern': "'Outfit', sans-serif",
    'Gothic': "'Anton', sans-serif",
    'Tattoo Ink': "'Anton', sans-serif",
    'Elegant': "'Great Vibes', cursive",
    'Minimal': "'Outfit', sans-serif"
  };
  var top = document.getElementById('wordTop');
  var bottom = document.getElementById('wordBottom');
  if(top) top.style.fontFamily = map[name] || "'Anton', sans-serif";
  if(bottom) bottom.style.fontFamily = map[name] || "'Anton', sans-serif";
}

document.addEventListener('DOMContentLoaded', function(){
  var input = document.getElementById('wordInput');
  if(input) input.addEventListener('input', renderWord);

  var styleSelect = document.getElementById('styleSelect');
  if(styleSelect){
    styleSelect.addEventListener('change', function(){
      setStyle(this.value, null);
    });
  }

  var burger = document.getElementById('burgerBtn');
  var drawer = document.getElementById('mobileDrawer');
  var closeBtn = document.getElementById('drawerClose');
  if(burger && drawer){
    burger.addEventListener('click', function(){ drawer.classList.add('open'); });
  }
  if(closeBtn && drawer){
    closeBtn.addEventListener('click', function(){ drawer.classList.remove('open'); });
  }
  if(drawer){
    drawer.addEventListener('click', function(e){
      if(e.target === drawer) drawer.classList.remove('open');
    });
  }

  document.querySelectorAll('.has-menu > a').forEach(function(trigger){
    trigger.addEventListener('click', function(e){
      e.preventDefault();
      var parent = trigger.closest('.has-menu');
      var wasOpen = parent.classList.contains('open');
      document.querySelectorAll('.has-menu.open').forEach(function(m){ m.classList.remove('open'); });
      if(!wasOpen) parent.classList.add('open');
    });
  });
  document.addEventListener('click', function(e){
    document.querySelectorAll('.has-menu.open').forEach(function(m){
      if(!m.contains(e.target)) m.classList.remove('open');
    });
  });
});
