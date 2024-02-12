window._harvestPlatformConfig = {
    "applicationName": "MondayCustom",
    "skipStyling": false
};

$(document).ready(function(){
  const { pathname, href } = window.location;
  if (isPulseView(pathname)) setTimeout(main(pathname, href), 1000);
  
  window.addEventListener('locationchange', function () {
    const { pathname, href } = window.location;
    if (isPulseView(pathname)) setTimeout(main(pathname, href), 1000);
  });
});

function main(pathname, href){
  console.log('Adding Harvest timer to Monday Item');
  return function() {
    // Remove any existing timer buttons
    const timer = $('.harvest-timer');
    $('.harvest-timer').remove();
    
    const title = $(".slide-panel.open .title-wrapper h2").text();
    const tasktitle = title.replaceAll(/['"]/g,'');
    const taskurl = href;
    
    const taskid = pathname.substring(pathname.lastIndexOf('/')+1);
    const projectid = pathname.split('/')[2];
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
  return /^\/boards\/\d+(?:\/views\/\d+)?\/pulses\/\d+$/.test(path);
};
