function renderWord(){
  var input = document.getElementById('wordInput');
  var val = (input ? input.value.trim() : '') || 'AMBIGRAM';
  var top = document.getElementById('wordTop');
  var bottom = document.getElementById('wordBottom');
  if(top) top.textContent = val;
  if(bottom) bottom.textContent = val;
}

function setStyle(name, el){
  document.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
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
});
