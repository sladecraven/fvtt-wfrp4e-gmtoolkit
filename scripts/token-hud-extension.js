class TokenHudExtension {

    static async addMovementTokenTip(app, html, data) {

        let actor = game.actors.get(data.actorId);
        if (actor === undefined)
            return;;
            
        const actorData = actor.data;
        const actorMoveDetails = actorData.data.details.move;

        let move = actorMoveDetails.value;
        let walk = actorMoveDetails.walk;
        let run = actorMoveDetails.run;
        let swim = actorMoveDetails.value / 2;

        let TooltipMovement = game.i18n.localize('Move') + ": " + move +"; " + game.i18n.localize('Walk') +": " + walk + "; " + game.i18n.localize('Run') + ": " + run + "; " + game.i18n.localize('Swim') + ": " + swim
        
        // Create space for Hud Extensions next to elevation icon
        let divTokenHudExt = '<div class="tokenhudext left">';
        html.find('.attribute.elevation').wrap(divTokenHudExt);

        let hudMovement = $('<div class="control-icon tokenhudicon left" title="' + TooltipMovement + '"><i class="fas fa-shoe-prints"></i> ' + run + '</div>');
        html.find('.attribute.elevation').before(hudMovement);// Add Movement token tip
        // Add interactions for Movement
        hudMovement.find('i').dblclick(async (ev) => {
            // console.log("GM Toolkit (WFRP4e) | Movement hud extension double-clicked.")
            if (ev.altKey && ev.shiftKey && ev.ctrlKey) {
                if (hasSkill(actor, "Swim") !== null) {
                    actor.setupSkill(skill.data);
                }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
            }
            if (ev.ctrlKey && ev.altKey) {
                if (hasSkill(actor, "Climb") !== null) {
                    actor.setupSkill(skill.data);
                }
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            if (ev.ctrlKey && ev.shiftKey) {
                if (hasSkill(actor, "Drive") !== null) {
                    actor.setupSkill(skill.data);
                }
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            if (ev.altKey && ev.shiftKey) {
                // TODO: Interrogate actor Ride specializations and offer selection if more than one is available
                if (hasSkill(actor, "Ride") !== null) {
                    actor.setupSkill(skill.data);
                }
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            if (ev.ctrlKey) {
                if (hasSkill(actor, "Dodge") !== null) {
                    actor.setupSkill(skill.data);
                }
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            if (ev.altKey) {
                if (hasSkill(actor, "Athletics") !== null) {
                    actor.setupSkill(skill.data);
                }
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            if (ev.shiftKey) {
                // TODO: Interrogate actor Stealth specializations and offer selection if more than one is available
                if (hasSkill(actor, "Stealth") !== null) {
                    actor.setupSkill(skill.data);
                } 
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            console.log("GM Toolkit (WFRP4e) | " + "Movement Button Clicked")
        }) 

    }
    
    static async addInitiativeTokenTip(app, html, data) {
        
       // Do not show initiative token tip unless this is the active scene 
       // TODO: Make conditional visibility an option
       if (game.scenes.active.isView === false)
        return;

       let actor = game.actors.get(data.actorId);
       if (actor === undefined)
            return;

       const actorCharacteristics = actor.data.data.characteristics;

       let initiative = actorCharacteristics.i.value;
       let agility = actorCharacteristics.ag.value;

       let TooltipInitiative = game.i18n.localize('CHAR.I') + ": " + initiative +"; " + game.i18n.localize('CHAR.Ag') +": " + agility

       // Create space for Hud Extensions next to combat icon
       let divTokenHudExt = '<div class="tokenhudext right">';
       html.find('.control-icon.combat').wrap(divTokenHudExt);

       let hudInitiative = $('<div class="control-icon tokenhudicon right" title="' + TooltipInitiative + '"><i class="fas fa-spinner"></i> ' + initiative + '</div>');
       html.find('.control-icon.combat').after(hudInitiative); // Add Initiative and Agility token tip
       // Add interactions for Initiative and Agility
        hudInitiative.find('i').dblclick(async (ev) => {
            // console.log("GM Toolkit (WFRP4e) | Initiative hud extension double-clicked.")
            if (ev.ctrlKey) {
                actor.setupCharacteristic("i");
                ev.preventDefault();
                ev.stopPropagation();
            }
            if (ev.altKey) {
                actor.setupCharacteristic("ag");
                ev.preventDefault();
                ev.stopPropagation();
            } 
        })

   }

    static async addPlayerCharacterTokenTip(app, html, data) {

        let actor = game.actors.get(data.actorId);
        if (actor === undefined)
            return;
        
        if (actor.data.type === "character") {
            
            // Set variables
            const actorData = actor.data;
            const actorStatus = actorData.data.status;
            const actorCharacteristics = actor.data.data.characteristics;
        
            let fortune = actorStatus.fortune.value 
            let fate = actorStatus.fate.value
            let resolve = actorStatus.resolve.value 
            let resilience = actorStatus.resilience.value
            let corruption = actorStatus.corruption.value
            let maxCorruption = actorStatus.corruption.max 
            let sin = actorStatus.sin.value
            let perception = actor.items.find(i => i.data.name === game.i18n.localize('Perception')  ).data.data.advances.value + actorCharacteristics.i.value
            let intuition = actor.items.find(i => i.data.name === game.i18n.localize('Intuition') ).data.data.advances.value + actorCharacteristics.i.value

            let TooltipFortune = game.i18n.localize('Fortune') + ": " + fortune +"; " + game.i18n.localize('Fate') +": " + fate
            let TooltipResolve = game.i18n.localize('Resolve') + ": " + resolve +"; " + game.i18n.localize('Resilience') +": " + resilience
            let TooltipCorruption = game.i18n.localize('Corruption') + ": " + corruption +" / " + maxCorruption + "; " + game.i18n.localize('Sin') +": " + sin
            let TooltipPerception = game.i18n.localize('Perception') + ": " + perception +"; " + game.i18n.localize('Intuition') +": " + intuition

            let divTokenHudExt = '<div class="tokenhudext left">';
            
            // Create space for Hud Extensions next to config icon
            // Resolve, Resilience, Fortune, Fate
            html.find('.control-icon.config').wrap(divTokenHudExt);

            // Resolve and Resilience
            let hudResolve = $(`<div class="control-icon tokenhudicon left" title="` + TooltipResolve + `"><i class="fas fa-hand-rock">&nbsp;` + resolve + `</i></div>`);
            html.find('.control-icon.config').before(hudResolve); // Add Resolve token tip
            // Add interactions for Resolve and Resilience
            hudResolve.find('i').contextmenu(async (ev) => {
                // console.log("GM Toolkit (WFRP4e) | Resolve hud extension right-clicked.")
                if (ev.ctrlKey) {
                    adjustStatus(actor, "Resolve", -1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.shiftKey) {
                    adjustStatus(actor, "Resolve", 1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
            })
            hudResolve.find('i').dblclick(async (ev) => {
                // console.log("GM Toolkit (WFRP4e) | Resolve hud extension double-clicked.")
                if (ev.ctrlKey) {
                    if (hasSkill(actor, "Cool") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.altKey) {
                    if (hasSkill(actor, "Endurance") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.shiftKey) {
                    if (hasSkill(actor, "Consume Alcohol") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
            })  

            // Fortune and Fate
            let hudFortune = $(`<div class="control-icon tokenhudicon left" title="` + TooltipFortune + `"><i class="fas fa-dice">&nbsp;` + fortune + `</i></div>`);
            html.find('.control-icon.config').before(hudFortune); // Add Fortune token tip
            // Add interactions for Fortune and Fate
            hudFortune.find('i').contextmenu(async (ev) => {
                // console.log("GM Toolkit (WFRP4e) | Fortune hud extension right-clicked.")
                console.log("Fortune Button Right-Clicked") // TODO: Add localization
                if (ev.ctrlKey) {
                    adjustStatus(actor, "Fortune", -1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.shiftKey) {
                    adjustStatus(actor, "Fortune", 1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
            })
            hudFortune.find('i').dblclick(async (ev) => {
                // console.log("GM Toolkit (WFRP4e) | Fortune hud extension double-clicked.")
                if (ev.shiftKey && ev.altKey) {
                    if (hasSkill(actor, "Charm Animal") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.ctrlKey) {
                    if (hasSkill(actor, "Gamble") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.shiftKey) {
                    if (hasSkill(actor, "Charm") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.altKey) {
                    if (hasSkill(actor, "Gossip") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
            })


            // Create space for Hud Extensions next to target icon
            // Corruption, Sin, Perception, Intuition
            html.find('.control-icon.target').wrap(divTokenHudExt);

            // Corruption and Sin
            let hudCorruption = $(`<div class="control-icon tokenhudicon left" title="` + TooltipCorruption + `"><i class="fas fa-bahai">&nbsp;` + corruption + `</i></div>`);
            html.find('.control-icon.target').before(hudCorruption); // Add Corruption token tip        
            // Add interactions for Corruption and Sin           
            hudCorruption.find('i').contextmenu(async (ev) => {
                // console.log("GM Toolkit (WFRP4e) | Corruption hud extension right-clicked.")
                if (ev.ctrlKey && ev.altKey) {
                    adjustStatus(actor, "Sin", -1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.shiftKey && ev.altKey) {
                    adjustStatus(actor, "Sin", 1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.ctrlKey) {
                    adjustStatus(actor, "Corruption", -1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.shiftKey) {
                    adjustStatus(actor, "Corruption", 1);
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
            })            
            hudCorruption.find('i').dblclick(async (ev) => {
                // console.log("GM Toolkit (WFRP4e) | Corruption hud extension double-clicked.")
                if (ev.ctrlKey && ev.shiftKey) {
                    let result = WFRP_Tables.formatChatRoll("mutatemental");
                    ChatMessage.create(WFRP_Utility.chatDataSetup(result, "roll", true));
                    console.log("GM Toolkit (WFRP4e) | " + actor.name + " spawned a mental mutation.") 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.ctrlKey && ev.altKey) {
                    let littlePrayer = new Roll("d100") 
                    littlePrayer.roll();
                    let result = `${actor.name} offered a Little Prayer to the Gods (${littlePrayer.result}).`  // TODO: Add Localization
                    ChatMessage.create(WFRP_Utility.chatDataSetup(result, "gmroll", true));
                    console.log("GM Toolkit (WFRP4e) | " + result) 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.shiftKey && ev.altKey) {
                    let result = WFRP_Tables.formatChatRoll("wrath");
                    ChatMessage.create(WFRP_Utility.chatDataSetup(result, "roll", true));
                    console.log("GM Toolkit (WFRP4e) | " + actor.name + " incurred the Wrath of the Gods.") 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.ctrlKey) {
                    let result = WFRP_Tables.formatChatRoll("mutatephys");
                    ChatMessage.create(WFRP_Utility.chatDataSetup(result, "roll", true));
                    console.log("GM Toolkit (WFRP4e) | " + actor.name + " spawned a physical mutation.") 
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.altKey) {
                    if (hasSkill(actor, "Pray") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
            }) 

            // Perception and Intuition
            let hudPerception = $(`<div class="control-icon tokenhudicon left" title="` + TooltipPerception + `"><i class="fas fa-eye">&nbsp;` + perception + `</i></div>`);
            html.find('.control-icon.target').before(hudPerception); // Add Perception token tip
            // Add interactions for Perception and Intuition
            hudPerception.find('i').dblclick(async (ev) => {
                // console.log("GM Toolkit (WFRP4e) | Perception hud extension double-clicked.") 
                if (ev.altKey) {
                    if (hasSkill(actor, "Intuition") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
                if (ev.ctrlKey) {
                    if (hasSkill(actor, "Perception") !== null) {
                        actor.setupSkill(skill.data);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                    return;
                }
            })

        }
    }

}

/** 
 * Returns whether an actor has the skill to be tested.
 * @param {Object} actor 
 * @param {String} targetSkill - Name of skill to be tested.
 * @return {Object} The skill object to be tested.
**/ 
function hasSkill (actor, targetSkill) {
    // Match exact skill only
    skill = actor.items.find(i => i.type == "skill" && i.data.name === game.i18n.localize(targetSkill)) 
    if (skill == null) {
        let message = actor.name + " does not have the " + targetSkill + " skill. Aborting skill test. ";
        console.log("GM Toolkit (WFRP4e) | " + message)
        ui.notifications.error(message) 
    } else {
        console.log("GM Toolkit (WFRP4e) | " + actor.name + " has the " + game.i18n.localize(targetSkill) + " skill.") 
    }
    return (skill);
}

/** 
 * Increase or reduce the status value from the Token Hud
 * @param {Object} actor        
 * @param {String} status - Characteristic to be adjusted
 * @param {Number} [1|-1] - increase or decrease value for status
**/ 
function adjustStatus (actor, status, change) {
    let originalStatus = Number();
    let newStatus = Number();
   
    switch (status)
    {
        case "Resolve":
            originalStatus = actor.data.data.status.resolve.value
            if (Number(change) < 0) {
                newStatus = Math.max((originalStatus + Number(change)),0)
            } else {
                    maxStatus = actor.data.data.status.resilience.value
                    newStatus = Math.min((originalStatus + Number(change)),maxStatus)
                }
            actor.update({
                "data.status.resolve.value": newStatus
            })
            break;
        case "Sin":
            originalStatus = actor.data.data.status.sin.value
            if (Number(change) < 0) {
                newStatus = Math.max((originalStatus + Number(change)),0)
            } else {
                    newStatus = Number(originalStatus + change)
                }
            actor.update({
                "data.status.sin.value": newStatus
            })
            break;
        case "Corruption":
            originalStatus = actor.data.data.status.corruption.value
            if (Number(change) < 0) {
                newStatus = Math.max((originalStatus + Number(change)),0)
            } else {
                    maxStatus = actor.data.data.status.corruption.max
                    newStatus = Math.min((originalStatus + Number(change)),maxStatus)
                }
            actor.update({
                "data.status.corruption.value": newStatus
            })
            break;
        case "Fortune":
            originalStatus = actor.data.data.status.fortune.value
            if (Number(change) < 0) {
                newStatus = Math.max((originalStatus + Number(change)),0)
            } else {
                    let item = actor.items.find(i => i.data.name === game.i18n.localize("GMTOOLKIT.Talent.Luck") )
                    let advLuck = Number();
                    if(item == undefined || item.data.data.advances.value < 1) {
                        advLuck = 0;
                        } else { 
                            for (let item of target.actor.items)
                                {
                                if (item.type == "talent" && item.name == game.i18n.localize("GMTOOLKIT.Talent.Luck"))
                                    {
                                        advLuck += item.data.data.advances.value;
                                    }
                                }
                        }
                    maxStatus = actor.data.data.status.fate.value + advLuck
                    newStatus = Math.min((originalStatus + Number(change)),maxStatus)
                }
            actor.update({
                "data.status.fortune.value": newStatus
            })
            break;    
    }

    targetName = actor.data.name
    // TODO: Context-specific message for no change 
    // TODO: Context-specific message for no max value reached
    // Chat log message to confirm outcome
    result = (game.i18n.localize(status) + " changed from " + Number(originalStatus) + " to " + Number(newStatus) + " for " + targetName + ".")
    ChatMessage.create(WFRP_Utility.chatDataSetup(result, "roll", true));
    // sendChatMessage (actor, chatContent)   
    // UI notification to confirm outcome
    ui.notifications.notify(result) 
    return(result)
}  

/*
 * TODO: Extend here for module settings
*/
// 
Hooks.on('ready', () => {
    if (game.user.isGM) {  // TODO: Optionalise to allow players to access hud extensions
        Hooks.on('renderTokenHUD', (app, html, data) => { TokenHudExtension.addMovementTokenTip(app, html, data) });
        Hooks.on('renderTokenHUD', (app, html, data) => { TokenHudExtension.addInitiativeTokenTip(app, html, data) });
        Hooks.on('renderTokenHUD', (app, html, data) => { TokenHudExtension.addPlayerCharacterTokenTip(app, html, data) });
    }

});

console.log("GM Toolkit (WFRP4e) | Token Hud Extensions loaded.");