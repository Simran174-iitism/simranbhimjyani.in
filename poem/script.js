var allow = true;
var load = true;
var audio = true;

//$('body').css('height', $(document).innerHeight());

const poemElement = $(".main_left__poem");

// ## Create a function to play our sounds
function playSound(sound) {
    if (audio) {
        sound.loop = true;
        sound.play(); // Play sound
    }
}

fall = new Audio(
    "assets/audio/birds-chirping.mp3"
);
lighthouse = new Audio(
    "assets/audio/giggling-6799.mp3"
);
hope = new Audio(
    "assets/audio/birds-chirping.mp3"
);
moon = new Audio(
    "assets/audio/busy-street-ambience-195884.mp3"
);
sing = new Audio(
    "assets/audio/a-gentle-breeze-wind-1-14813.mp3"
);
space = new Audio(
    "assets/audio/a-gentle-breeze-wind-1-14813.mp3"
);

soundscape = new Audio();

soundscape.volume = 0.4;

const poems = [
    {

        poem:
            "An empty space,<br />With a window offering a view<br />A bird, sitting outside on a plain wall<br />A patch of green grass <br />Some unrecognized sounds and voices<br />A little breeze<br />Somebody laughing,<br />Somebody singing inside their homes<br />The Bird flies away <br />",
        animation: "lighthouse",
        color: "lightblue",
        audio: lighthouse
    },

    {

        poem:
            "Making the moss more visible in its absence<br />A mobile phone is ringing at the neighbours'<br />Somebody is talking on the phone <br />The bird returns to its place with another tiny<br />Hops around with its partner <br />The sun shines more brightly now <br />You, gazing, staring, listening, thinking <br />Close to the window <br />",

        animation: "fall",        
        color: "lightblue",
        audio: fall
    },
    {
        
        poem:
            "On your chair <br />gazing ,staring ,listening ,thinking <br />Breathing deeply <br />Closing your eyes,when the gush of breeze meets your face <br />Looking for the bird now <br />How it passes its day <br />Simply flying to and fro <br />There are more ,you gaze upwards at the - <br />'Bluest sky' you thought was seen only when you were a child ! <br />",
        animation: "sing",
        color: "lightblue",
        audio: sing
    },

    {
        poem:
            "The sun becomes dim now, for you, to see, what more the sky can do for you <br />How long you took, to sit and look around you<br />The sky that had always been the same <br />but you flew away like that bird that made that plain wall look more forlorn<br />But the bird, that little winged creature ,it knows the joys of returning soon <br />But you took 15 years <br />To just look back at the sky <br /><br /><b>And no wonder you had been thinking that blue was your favourite colour !</b><br />",
        animation: "hope",
        color: "lightblue",
        audio: hope
    },
    {

        poem:"This picture has been taken after 4 years of composing the poem(2024) and now, the green field is no more visible, as buildings have been constructed. The  sparrow is also not seen any more. Only the blue sky remains!<br />",

        animation: "moon",
        color: "lightblue",
        audio: moon
    },

];

if (window.location.href.split("slide=").pop().length != 1) {
    var index = 0;
} else {
    var index = window.location.href.split("slide=").pop();
}

// console.log(index);
if (load) {
    $(".loader").fadeIn(1000);

    $(window).bind("load", function () {
        setTimeout(function () {
            $(".loader").fadeOut(1000);
        }, 1000);
        setTimeout(function () {
            updatePoem(index);
        }, 1000);
        setTimeout(function () {
            $(".main").fadeIn(1000);
        }, 2000);
    });
} else {
    $(".main").show();
}

function animateText(text) {
    text.find("h1, p, i").addClass("out_left");
}

function staticText(text) {
    text.find("h1, p, i").removeClass("out_left");
}

for (i = 0; i < poems.length; i++) {
    $(".main_center__pips").append('<div class="pip"></div>');
}
$(".pip:nth-of-type(" + parseInt(poems.length - index) + ")").addClass(
    "active"
);
function updatePoem(index) {
    if ($(window).width() < 620) {
        $("html,body").animate({ scrollTop: 0 }, "fast");
    }
    allow = false;
    animateText(poemElement);
    updateStage(index);
    // console.log("test");
    $(".pip").removeClass("active");
    // console.log(index);
    $(".pip:nth-of-type(" + parseInt(poems.length - index) + ")").addClass(
        "active"
    );

    setTimeout(function () {
        // poemElement.find("h1").html(poems[index].title);
        poemElement.find("p").html(poems[index].poem);
        // poemElement.find("i").html(`- ${poems[index].poet}`);
        // poemElement
        //     .find(".buttons_poet")
        //     .parent()
        //     .attr("href", poems[index].link);
        // console.log(soundscape);
    }, 800);
    setTimeout(function () {
        staticText(poemElement);
        allow = true;
        $(soundscape).animate({ volume: 0 }, 600);
    }, 800);

    setTimeout(function () {
        $(soundscape).attr("src", $(poems[index].audio).attr("src"));
        playSound(soundscape);
        $(soundscape).animate({ volume: 0.4 }, 600);
    }, 1400);
}

$(".reset").click(function () {
    resetStage(index);
});
function updateStage(index) {
    $(".main_center__stage").addClass("reverse");

    setTimeout(function () {
        $(".main_center__stage").removeClass(
            $(".main_center__stage").attr("class").split(" ").pop()
        );
        $(".main_center__stage").removeClass(
            $(".main_center__stage").attr("class").split(" ").pop()
        );
        $(".main_center__stage").addClass(poems[index].animation);
        $(".main_center__stage").css("background", poems[index].color);
    }, 1200);
}

function resetStage(index) {
    $(".main_center__stage").addClass("reverse");

    setTimeout(function () {
        $(".main_center__stage").removeClass(
            $(".main_center__stage").attr("class").split(" ").pop()
        );
        $(".main_center__stage").removeClass(
            $(".main_center__stage").attr("class").split(" ").pop()
        );
        $(".main_center__stage").css("background", poems[index].color);
    }, 800);

    setTimeout(function () {
        $(".main_center__stage").addClass(poems[index].animation);
    }, 850);
}
$(".next").click(function () {
    if ($(window).width() < 620) {
        soundscape.play();
        soundscape.pause();
    }
    // console.log(index);
    // console.log(allow);
    if (allow && index < poems.length - 1) {
        index++;
        console.log("up");
        updatePoem(index);
    } else if(allow){
        console.log("dd");
        index = 0;
        updatePoem(index);
    }
    else{
        window.location.reload();
    }
});





$(".back").click(function () {
    if ($(window).width() < 620) {
        soundscape.play();
        soundscape.pause();
    }
    // console.log(index);
    // console.log(allow);
    if (allow && index > 0) {
        index--;
        updatePoem(index);
    } else if(allow) {
        index = poems.length - 1;
        updatePoem(index);
    }else{
        window.location.reload();
    }
});

$("body").on("click", ".pip", function () {
    updatePoem(parseInt(poems.length - $(this).index() - 1));
    index = parseInt(poems.length - $(this).index() - 1);
});

/* ====================================================================

  Share on Twitter

=======================================================================  */

// function twShare(url, title, winWidth, winHeight) {
//     const winTop = 100;
//     const winLeft = 100;
//     window.open(
//         `https://twitter.com/intent/tweet?text=${title}`,
//         "sharer",
//         `top=${winTop},left=${winLeft},toolbar=0,status=0,width=${winWidth},height=${winHeight}`
//     );
// }

pen_id = $("._pen_id").text();

// $("body").on("click", ".tw", () => {
//     twShare(
//         `https://codepen.io/jcoulterdesign/full/115d3d5b7cbde34a217ac8db758e34a8`,
//         `Check out this animated version of "${poems[index].title}" by ${poems[index].poet} on PoetryWithCSS by @jamiecoulter89. https://codepen.io/jcoulterdesign/full/115d3d5b7cbde34a217ac8db758e34a8/?slide=${index} %23poetryWithCSS`,
//         520,
//         350
//     );
//     return false;
// });

("use strict");

///console.clear();





$(".main_right__audio").click(function () {
    if (audio) {
        audio = false;
        $(soundscape).animate({ volume: 0 }, 600);
        $("img.on").hide();
        $("img.off").show();
    } else {
        audio = true;
        $(soundscape).animate({ volume: 0.4 }, 600);
        $("img.on").show();
        $("img.off").hide();
    }
});

// Common function to open popup
function openPopup(heading, content) {
    $('#popup-heading').text(heading);
    $('#popup-body').html(content);
    $('#popup').removeClass('hidden');
}

// Close popup
$('.close-btn').click(function () {
    $('#popup').addClass('hidden');
});

class Grain {
    constructor (el) {
        /**
     * Options
     * Increase the pattern size if visible pattern
     */
        this.patternSize = 150;
        this.patternScaleX = 1;
        this.patternScaleY = 1;
        this.patternRefreshInterval = 3; // 8
        this.patternAlpha = 28; // int between 0 and 255,

        /**
     * Create canvas
     */
        this.canvas = el;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.patternScaleX, this.patternScaleY);

        /**
     * Create a canvas that will be used to generate grain and used as a
     * pattern on the main canvas.
     */
        this.patternCanvas = document.createElement('canvas');
        this.patternCanvas.width = this.patternSize;
        this.patternCanvas.height = this.patternSize;
        this.patternCtx = this.patternCanvas.getContext('2d');
        this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
        this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4

        /**
     * Prebind prototype function, so later its easier to user
     */
        this.resize = this.resize.bind(this);
        this.loop = this.loop.bind(this);

        this.frame = 0;

        window.addEventListener('resize', this.resize);
        this.resize();

        window.requestAnimationFrame(this.loop);
    }

    resize () {
        this.canvas.width = window.innerWidth * devicePixelRatio;
        this.canvas.height = window.innerHeight * devicePixelRatio;
    }

    update () {
        const {patternPixelDataLength, patternData, patternAlpha, patternCtx} = this;

        // put a random shade of gray into every pixel of the pattern
        for (let i = 0; i < patternPixelDataLength; i += 4) {
            // const value = (Math.random() * 255) | 0;
            const value = Math.random() * 255;

            patternData.data[i] = value;
            patternData.data[i + 1] = value;
            patternData.data[i + 2] = value;
            patternData.data[i + 3] = patternAlpha;
        }

        patternCtx.putImageData(patternData, 0, 0);
    }

    draw () {
        const {ctx, patternCanvas, canvas, viewHeight} = this;
        const {width, height} = canvas;

        // clear canvas
        ctx.clearRect(0, 0, width, height);

        // fill the canvas using the pattern
        ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillRect(0, 0, width, height);
    }

    loop () {
        // only update grain every n frames
        const shouldDraw = ++this.frame % this.patternRefreshInterval === 0;
        if (shouldDraw) {
            this.update();
            this.draw();
        }

        window.requestAnimationFrame(this.loop);
    }
}


/**
 * Initiate Grain
 */
const el = document.querySelector('.grain');
const grain = new Grain(el);

// Open Poet Popup
$('.buttons_poet').click(function (e) {
    e.preventDefault(); // Prevent default link behavior
    const poetContent = `
        <h1 style="margin-bottom:0">Simran</h1><br/><p style="margin-top:0">Learn more about the poet <strong></strong></p>
        <h1 style="margin-bottom:0">Mohana</h1><br/><p style="margin-top:0">Learn more about the poet <strong></strong></p>
        
    `;
    openPopup('About Us', poetContent);
});

