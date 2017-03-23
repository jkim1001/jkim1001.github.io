$(function() {

    var win = $(window),
         winHeight = win.height();


//=========================== Skill box =========================

    function accordion(){
        var skillAccordion = $("#skill-accordion");

        skillAccordion.find("dd").hide();
        skillAccordion.find("dt").on('click' , function(){
            $(this).toggleClass('selected').next().stop().slideToggle(500);
        });
    }

    accordion();


//=========================== About box ===========================

    function aboutBox(){
        $("#about-triggers>a").on('click' , function(e){
            e.preventDefault();
            var $this = $(this),
                indexLoc = $this.index(),
                textBox = $(".about-text"),
                textBoxHeight = textBox.height();

            $(".about-inner").animate({
                marginTop : - (indexLoc * textBoxHeight)
            }, 200 );
            $this.siblings().removeClass("about-active-trigger");
            $this.addClass("about-active-trigger");
        });
    }

    aboutBox();

//==================== Menu ========

    var siteMenu = $(".site-menu");

    function menuOpen(){
        $(".menu-trigger").on("click" , function(){
            siteMenu.fadeIn(500);
            body.addClass("no-scroll");
        });
    }

    function menuClose(){
        $(".menu-links").on("click" , function(e){
            e.preventDefault();
            siteMenu.fadeOut(500);
            body.removeClass("no-scroll");
        });
    }

    menuOpen();
    menuClose();

//=========== Scroll to section ===========

    function scrollToSection(){

        $("#menu a").add("#start-arrow").on("click" , function(e){

            var body = $("html , body"),
                 scrollTo = $(this).attr("data-scroll"),
                 mainFooter = $("#main-footer"),
                 footerHeight = mainFooter.height();

            e.preventDefault();

            if(scrollTo){

                body.animate({
                    scrollTop : $(scrollTo).offset().top
                }, 800);

            } else if(winHeight < footerHeight){

                body.animate({
                    scrollTop : mainFooter.offset().top
                }, 800);

            } else {

                body.animate({
                    scrollTop : $(document).height()
                }, 800);

            }

        });
    }

    scrollToSection();


    //=========================== Portfolio lightbox ===========================

    var $prtOverlay = $('<div class="prt-overlay"></div>'),
         $prtContainer = $('<div class="prt-container"></div>'),
         $prtTitle =  $('<h2 class="prt-title"></h2>'),
         $prtContent = $('<div class="prt-content clearfix"></div>'),
         $descriptionHolder = $('<div class="desc-holder clearfix"></div>'),
         $shortDesc = $('<span class="short-desc"></span>'),
         $description = $('<span class="description"></span>'),
         $imgContainer = $('<div class="img-container"></div>'),
         $img = $('<img class="prt-img">').appendTo($imgContainer),
         $btn = $('<a class="launch-btn" target="_blank"><span>Website</span></a>'),
         $controlContainer = $('<div class="control-container"></div>'),
         $closeBtn = $('<span class="overlay-close">X</span>');
         $control = $('<ul class="controls clearfix"></ul>').appendTo($controlContainer),
         $next = $('<li class="next">&gt;</li>').appendTo($control),
         $prev = $('<li class="prev">&lt;</li>').appendTo($control),
         body = $("body"),

    $prtOverlay.append($prtContainer);
    $prtContainer.append($prtTitle);
    $prtContainer.append($prtContent);
    $prtContainer.append($closeBtn);
    $prtContent.append($imgContainer);
    $prtContent.append($descriptionHolder);
    $prtContent.append($btn);
    $imgContainer.append($controlContainer);
    $descriptionHolder.append($shortDesc);
    $descriptionHolder.append($description);

    body.append($prtOverlay);

    var $currentOverlay;

    var links = $(".latest-work-image").on('click' , function(e){
        e.preventDefault();

        body.addClass("no-scroll");


        var $this = $(this),
             imgLoc = $this.attr("data-href"),
             siteLink = $this.attr("href");

        $img.attr("src" , imgLoc);

        var titleText = $this.find(".work-title").text(),
             $shortDescText = $this.find(".short-desc").text(),
             $descriptionText = $this.find(".description").text();
             $btn.attr("href" , "" + siteLink);
             $currentOverlay = this;

        $prtTitle.text(titleText);
        $shortDesc.text($shortDescText);
        $description.text($descriptionText);

        $prtOverlay.fadeIn(400);

    });

    $next.add($prev).on('click' , function(e){


        var max = links.length;

        var index;


        links.each(function(i){
            if(this === $currentOverlay){
                index = i;
            }
        });

        if(typeof index == 'undefined')
            return;

        if($next[0] === e.target){

            if (index + 1 < max) {
                index = index + 1;
            } else {
                index = 0;
            }

        } else {

            if (index - 1 >= 0) {
                index = index - 1;
            } else {
                index = max - 1;
            }

        }

        links.eq(index).trigger('click');


    });

       $closeBtn.click(function(e){

         body.removeClass("no-scroll");

         if($control.has(e.target).length == 0)
           $prtOverlay.fadeOut();
    });



    //================================ vhSupport =================

    function vhSupport() {

        if (Modernizr.cssvhunit) {
            return false;
        } else {

            $("#landing").css({
                "height": win.height()
            });

        }
    }

    win.resize(vhSupport);

    //================= on scroll ==========

    win.scroll(function(){

        var wScroll = $(this).scrollTop(),
            siteHeader = $("#site-header");

        $(".site-title-box").css({
            'transform' : 'translate(0px , '+ wScroll /2.5 +'%)'
        });

        if (wScroll > $("#landing").height() - 1) {
            siteHeader.fadeIn(300);
        } else {
            siteHeader.fadeOut(300);
        }

    });




});



