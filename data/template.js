import { col } from "./colors.js";

export const welcomeMenuTemplate = `


    /         / 
  ((__,-"""-__))    Welcome to
   '--)~   ~(--'       ${col.re}BULLS & COWS${col.res}   
  .-.(       ).-.   
  '~~'d|   |b'~~'               
      |     |         [${col.gr}P${col.res}]${col.gr}lay${col.res} or [${col.bl}E${col.res}]${col.bl}xit${col.res}
      (6___6)        
       '---'
      
      
       `;

// console.log(welcomeMenuTemplate);
// wenn console.log() hier, template start-anzeige

export const congratulationsTemplate = `

${col.gr}╔═══╗${col.res}─────────────${col.gr}╔╗${col.res}───${col.gr}╔╗${col.res}───${col.gr}╔╗${col.res}──────────${col.gr}╔╗
║╔═╗║${col.res}────────────${col.gr}╔╝╚╗${col.res}──${col.gr}║║${col.res}──${col.gr}╔╝╚╗${col.res}─────────${col.gr}║║
║║${col.res}─${col.gr}╚╬══╦═╗╔══╦═╦═╩╗╔╬╗╔╣║╔═╩╗╔╬╦══╦═╗╔══╣║
║║${col.res}─${col.gr}╔╣╔╗║╔╗╣╔╗║╔╣╔╗║║║║║║║║╔╗║║╠╣╔╗║╔╗╣══╬╝
║╚═╝║╚╝║║║║╚╝║║║╔╗║╚╣╚╝║╚╣╔╗║╚╣║╚╝║║║╠══╠╗
╚═══╩══╩╝╚╩═╗╠╝╚╝╚╩═╩══╩═╩╝╚╩═╩╩══╩╝╚╩══╩╝${col.res}
──────────${col.gr}╔═╝║${col.res}
──────────${col.gr}╚══╝${col.res}
`;
