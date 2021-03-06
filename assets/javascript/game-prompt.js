function setPromptMsgs(speed, sizes, messages) {
    $(`#game-prompts-div`).remove();
    // First, we add the Prompt Div
    $(`body main`).append(`<div id="game-prompts-div" class="hidden"></div>`);
    $(`#game-prompts-div`).append(`<div id="prompt-msgs-div"></div>`);

    let arenaWidth;
    let arenaHeight;
    switch (game.state) {
        case `choose`:
            arenaWidth = $(`#game-choose-grid`).outerWidth();
            arenaHeight = $(`#game-choose-grid`).outerHeight();
            break;
        case `arena`:
            arenaWidth = $(`#game-arena-grid`).outerWidth();
            arenaHeight = $(`#game-arena-grid`).outerHeight();
            break;
    }
    // console.log(`arenaWidth = ${arenaWidth}`); 
    // console.log(`arenaHeight = ${arenaHeight}`); 
    $(`#game-prompts-div`).attr(`style`, `height:${arenaHeight}px; width:${arenaWidth}px;`);

    // Then, set the Prompt Div Messages
    for (let i = 1; i <= 4; i++) {
        $(`#prompt-msgs-div`).append(`<p id="prompt-msg-${i}" class="prompt-msgs"></p>`);
        if (sizes[i - 1] != undefined) {
            $(`#prompt-msg-${i}`).addClass(`${sizes[i-1]}Prompt`);
            let convertedMessage = messages[i - 1];
            let htmlTags = convertedMessage.match(/<[^>]*>/gi);
            convertedMessage = convertedMessage.toUpperCase();
            if (htmlTags != undefined) {
                htmlTags.forEach((item, i) => {
                    convertedMessage = convertedMessage.replace(htmlTags[i].toUpperCase(), htmlTags[i]);
                });
            }
            $(`#prompt-msg-${i}`).html(`${convertedMessage}`);
        }
    }

    // Finally, we show the Prompt Div
    setTimeout(() => {
        $("#game-prompts-div").addClass(`${speed}-anim`);
        $("#game-prompts-div").removeClass("hidden");
        $("#game-prompts-div").addClass("show");
    }, 1);
}

function remPromptMsgs(speed, deletion) {
    // First, we hide the Prompt Div
    $("#game-prompts-div").removeClass("slow-anim medium-anim quick-anim");
    $("#game-prompts-div").addClass(`${speed}-anim`);
    $("#game-prompts-div").removeClass("show");
    $("#game-prompts-div").addClass("hidden");
    // console.log(`Activated remPromptMsgs()`); 

    // Finally, we delete the Prompt Div altogether
    setTimeout(() => {
        $(`#game-prompts-div`).remove();
    }, deletion);
}

function resetHeaderMsgs() {
    $(`#header-msg-1`).html("");
    $(`#header-msg-2`).html("");
    $(`#header-msg-3`).html("");
    $(`#header-msg-4`).html("");
}

function showDiv(div, speed) {
    console.log(`div = ${div}`);
    console.log(`speed = ${speed}`);

    $(`#div`).removeClass(`slow-anim medium-anim quick-anim`);
    $(`#div`).addClass(`${speed}-anim`);
    $(`#div`).removeClass(`hidden`);
    $(`#div`).addClass(`show`);
}