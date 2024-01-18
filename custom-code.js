window._harvestPlatformConfig = {
    "applicationName": "MondayCustom",
    "skipStyling": false
};

$(document).ready(function(){
  const { pathname, href } = window.location;
  if (isPulseView(pathname)) setTimeout(main(pathname), 1000);
  
  window.addEventListener('locationchange', function () {
    const newHref = window.location.href;
    const newPathname = window.location.pathname;
    if (isPulseView(newPathname) && newHref != href) setTimeout(main(newPathname), 1000);
  });
});

function main(pathname){
  return function() {
    // Remove any existing timer buttons
    $('.harvest-timer').remove();
    
    const tasktitle = $(".slide-panel.open .title-wrapper h2").text();
    const taskurl = window.location.href;
    
    const taskid = pathname.substring(pathname.lastIndexOf('/')+1);
    const projectid = location.pathname.split('/')[2];
    const projectname = $("#board-header .board-name").find(".ds-text-component").text();
    const actionsWrapper = $(".pulse_actions_wrapper");
    actionsWrapper.append("<div class='harvest-timer' id='harvest-timer-obj' style='height: 28px; width: 30px; text-align: center; padding-top: 6px; margin-left: 8px; color: #fff; background: #fff; border-radius: 4px; border: 2px solid #f58933;' data-item='{\"id\":\""+taskid+"\", \"name\": \""+tasktitle+"\"}' data-permalink='"+taskurl+"' data-group='{\"id\": \""+projectid+"\", \"name\": \""+projectname+"\" }' >");
    
    $("#harvest-messaging").trigger({
      type: "harvest-event:timers:add",
      element: $("#harvest-timer-obj")
    });
  };
}

function isPulseView(path) {
  return /^\/boards\/\d+\/pulses\/\d+$/.test(path);
};
