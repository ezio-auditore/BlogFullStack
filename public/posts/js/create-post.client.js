function h(e) {
  $(e).css({'height':'65px','overflow-y':'hidden'}).height(e.scrollHeight-30);
}
$('textarea').each(function () {
  h(this);
}).on('input', function () {
  h(this);
});