//----------Targetting CSS Variables----------
let r = document.querySelector(':root');
let rs = getComputedStyle(r);

//----------Sliding choosing button animation----------
let mainCross = document.querySelector('.option-cross');
let mainCrossImg = document.querySelector('.option-cross img');

let mainCircle = document.querySelector('.option-circle');
let mainCircleImg = document.querySelector('.option-circle img');

let playerSelection = "cross";

//----------Media Queries----------
const mediaLarge = window.matchMedia('(max-width : 1200px) and (min-width : 700px)');
const mediaSmall = window.matchMedia('(max-width : 700px) and (min-width : 450px)');
const mediaVerySmall = window.matchMedia('(max-width : 450px)');

//----------Main game screen---------- 
let styleSheet = document.getElementById('style-sheet');
let page1 = document.getElementById('page1');
let page2 = document.getElementById('page2');

let vsCpu = document.getElementById('vs-cpu');
let vsPlayer = document.getElementById('vs-player');
let pvp = document.querySelector('#pvp');
let pvpContainer = document.querySelector('#pvp-container');
let searchClose = document.querySelector('.search-close');
let playerTurn = document.querySelector('#whose-turn');
let cpuchoose = document.getElementById('opponent-chance');

let restartPanel = document.getElementById('restart-panel');
let restartContainer = document.querySelector('.restart-container');
let restart = document.getElementById('restart');
let cancelBtn = document.getElementById("cancel-btn");
let restartBtn = document.getElementById("restart-btn");

let buttons = document.querySelectorAll('#selection-area button ');
arr = [...buttons];

let resultPanel = document.querySelector('#result');
let resultContainer = document.querySelector('.result-container');
let resultHead = document.querySelector('.result-container h3');
let resultDeclarationHead = document.querySelector('.result-declaration h1');
let resultImg = document.querySelector('.result-declaration img');
let quit = document.querySelector('.result-quit');
let nextRound = document.querySelector('.result-next');
let flag;

// ----------Score Variables----------
let playerScore = document.querySelector('#player-score p');
let tiesScore = document.querySelector('#ties-score p');
let cpuScore = document.querySelector('#cpu-score p');
let playerpoint = localStorage.getItem("playerpoint");
let tiespoint = localStorage.getItem("tiespoint");
let cpupoint = localStorage.getItem("cpupoint");
playerScore.innerHTML = playerpoint;
tiesScore.innerHTML = tiespoint;
cpuScore.innerHTML = cpupoint;

//----------Main Game working variables----------
let bothChoosedBtn = [];
let userChoosedBtn = [];
let cpuChoosedBtn = [];
let conditions = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//----------Variables for Random Value----------
let a = 0;
let b = 8;
let mod;
let a_to_b;

//----------Function for CPU or User's Turn----------
function chance(playerChance) {
    if(playerChance == 'cross'){
        playerTurn.src = './Images/Cross-light.svg';
    }

    else if(playerChance == 'circle'){
        playerTurn.src = './Images/Circle-light.svg';
    }
}

//----------Main Event Listener for listing every event after DOM is Loaded----------
document.addEventListener("DOMContentLoaded", () => {
    // --------------- PAGE 1 ---------------
    // ----------Page1 opening----------
    page1.style.display = 'flex';

    // ----------Sliding bar----------
    mainCircle.addEventListener('click', function() {
        setTimeout(()=>{
            mainCircleImg.src = './Images/Circle-dark.svg';
            mainCrossImg.src = './Images/Cross-light.svg';
        }, 400);

        if(mediaLarge.matches){
            r.style.setProperty('--sliding-translate', '220px')
        }
        else if(mediaSmall.matches){
            r.style.setProperty('--sliding-translate', '133px')
        }
        else if(mediaVerySmall.matches){
            r.style.setProperty('--sliding-translate', '87px')
        }
        else{
            r.style.setProperty('--sliding-translate', '270px')
        }

        r.style.setProperty('--user-symbol', 'url("./Images/Circle-hover.svg")');
        
        playerSelection = 'circle';
    })  
    mainCross.addEventListener('click', function() {
        crossFlag = true;
        setTimeout(()=>{
            mainCrossImg.src = './Images/Cross-dark.svg';
            mainCircleImg.src = './Images/Circle-light.svg';
        }, 400);
        
        r.style.setProperty('--sliding-translate', '0px')
        
        r.style.setProperty('--user-symbol', 'url("./Images/Cross-hover.svg")');
        playerSelection = 'cross'
    })  

    // ----------VS CPU button functions----------
    vsCpu.addEventListener('click', () => {
        page1.style.animation = 'page-change 0.5s';
        setTimeout(() => {
            page1.style.display = 'none';
        }, 400);
        setTimeout(() => {
            styleSheet.href = 'style2.css';
        }, 600);
        if(playerSelection == 'circle' ){
            r.style.setProperty('--user-symbol', 'none');
            arr.forEach(btn => { 
                btn.style.cursor = 'default'; 
                btn.disabled = true;
            })

            mod = Math.random();
            a_to_b = Math.round(a + (b-a)*mod);
            cpuChoosedBtn.push(a_to_b);
            bothChoosedBtn.push(a_to_b);
            cpuchoose.style.display = 'flex';
            setTimeout(() => {
                cpuchoose.style.display = 'none';
                arr.forEach(btn => {
                    btn.style.cursor = 'pointer';
                    btn.disabled = false;
                    bothChoosedBtn.forEach(num => {
                        if(btn == arr[num]){
                            btn.style.cursor = 'default';
                            btn.disabled = true;
                            btn.style.setProperty('--user-symbol', 'none');
                        }
                    })
                });  
    
                if (playerSelection == 'circle'){
                    r.style.setProperty('--user-symbol', 'url("./Images/Circle-hover.svg")');
                    arr[a_to_b].innerHTML = `<img class = "hover-img" src = "./Images/Cross-logo.svg">`;
                }
                else if(playerSelection == 'cross'){
                    r.style.setProperty('--user-symbol', 'url("./Images/Cross-hover.svg")');
                    arr[a_to_b].innerHTML = `<img class = "hover-img" src = "./Images/Circle-logo.svg">`;
                }
                chance('circle');
            }, 3600);
        }
    })

    // ----------VS player button functions----------
    vsPlayer.addEventListener('click', () => {
        pvp.style.display = 'flex';
        pvpContainer.style.animation = 'search-player 0.5s ease-in-out';
    })
    searchClose.addEventListener('click', () =>{
        setTimeout(()=>{
            pvp.style.display = 'none';
        }, 500);
        pvpContainer.style.animation = 'closing 0.5s ease-in-out';
    })


    // --------------- PAGE2 ---------------
    // ----------Navigation Restart button functions----------
    restart.addEventListener('click', () => {
        restartPanel.style.display = 'flex';
        restartContainer.style.animation = 'search-player 0.5s ease-in-out';
    })
    cancelBtn.addEventListener('click', () =>{
        setTimeout(() => {
            restartPanel.style.display = 'none';         
        }, 500);
        restartContainer.style.animation = 'closing 0.5s ease-in-out';
    })
    restartBtn.addEventListener('click', () => {
        location.reload(true);
    })

    //----------Function for Every button choosed----------
    arr.forEach(e => {
        e.addEventListener('click', () => {
            //----------Hover State Image Changer on user selection----------
            if(playerSelection == 'circle'){
                // chance('circle');
                e.innerHTML = `<img class = "hover-img" src = "./Images/Circle-logo.svg">`;
            }
            else if(playerSelection == 'cross'){
                // chance('cross');
                e.innerHTML = `<img class = "hover-img" src = "./Images/Cross-logo.svg">`;
            }

            // ----------Stores Random value for cpu----------
            if(bothChoosedBtn.length < 9){
                mod = Math.random();
                a_to_b = Math.round(a + (b-a)*mod);
            }
            for(let i=0; i<9; i++){
                if(arr[i] == e){
                    userChoosedBtn.push(i);
                    bothChoosedBtn.push(i);
                }
            }
            while(bothChoosedBtn.includes(a_to_b)){
                mod = Math.random();
                a_to_b = Math.round(a + (b-a)*mod);
                if(bothChoosedBtn.length == 9){
                    break;
                }
            }
            if(bothChoosedBtn.length<9){
                cpuChoosedBtn.push(a_to_b);
                bothChoosedBtn.push(a_to_b);
                cpuchoose.style.display = 'flex';
            }
            r.style.setProperty('--user-symbol', 'none');
            arr.forEach(btn => { 
                btn.style.cursor = 'default'; 
                btn.disabled = true;
            })
            if(playerSelection == 'circle'){
                chance('cross');
            }
            else if(playerSelection == 'cross'){
                chance('circle');
            }
            let playingTimeout = setTimeout(() => {
                cpuchoose.style.display = 'none';
                arr.forEach(btn => {
                    btn.style.cursor = 'pointer';
                    btn.disabled = false;
                    bothChoosedBtn.forEach(num => {
                        if(btn == arr[num]){
                            btn.style.cursor = 'default';
                            btn.disabled = true;
                            btn.style.setProperty('--user-symbol', 'none');
                        }
                    })
                });            

                if (playerSelection == 'circle'){
                    r.style.setProperty('--user-symbol', 'url("./Images/Circle-hover.svg")');
                    arr[a_to_b].innerHTML = `<img class = "hover-img" src = "./Images/Cross-logo.svg">`;
                }
                else if(playerSelection == 'cross'){
                    r.style.setProperty('--user-symbol', 'url("./Images/Cross-hover.svg")');
                    arr[a_to_b].innerHTML = `<img class = "hover-img" src = "./Images/Circle-logo.svg">`;
                }
            }, 3000);
            let chanceTime= setTimeout(() => {
                if(playerSelection == 'circle'){
                    chance('circle');
                }
                else if(playerSelection == 'cross'){
                    chance('cross');
                }
            }, 3000);

            //----------It checks the condition for every selection----------
            for(let i = 0; i<8; i++){
                let sumUser = 0;
                let sumCpu = 0;
                let winbtnUser = [];
                let winbtnCpu = [];
                
                conditions[i].forEach(cond => {
                    userChoosedBtn.forEach(num => {
                        if (cond == num){
                            sumUser ++;
                            winbtnUser.push(num);
                        }
                    })
                    cpuChoosedBtn.forEach(num => {
                        if (cond == num){
                            sumCpu ++;
                            winbtnCpu.push(num);
                        }
                    })
                })

                //----------Checks for User----------
                if (sumUser == 3){
                    flag = 'user';
                    console.log(winbtnUser);
                    winbtnUser.forEach(num => {
                        cpuchoose.style.display = "none";
                        
                        if(playerSelection == 'circle'){
                            arr[num].style.background = '#f2b137';
                            arr[num].innerHTML = `<img class = "hover-img" src = "./Images/Circle-dark-button.svg">`;
                        }
                        else if(playerSelection == 'cross'){
                            arr[num].style.background = '#31c3bd';
                            arr[num].innerHTML = `<img class = "hover-img" src = "./Images/Cross-dark-button.svg">`;
                        }
                    })
                    break;
                }

                //----------Checks for CPU----------
                else if (sumCpu == 3){
                    flag = 'cpu';
                    setTimeout(() => {
                        arr.disabled = true;
                        clearTimeout(playingTimeout);
                        clearTimeout(chanceTime);
                        winbtnCpu.forEach(num => {
                            cpuchoose.style.display = "none";
                            
                            if(playerSelection == 'circle'){
                                arr[num].style.background = '#31c3bd';
                                arr[num].innerHTML = `<img class = "hover-img" src = "./Images/Cross-dark-button.svg">`;
                            }
                            else if(playerSelection == 'cross'){
                                arr[num].style.background = '#f2b137';
                                arr[num].innerHTML = `<img class = "hover-img" src = "./Images/Circle-dark-button.svg">`;
                            }
                        })
                    },3000)
                    break;
                }

                //----------For Draw----------
                else if(bothChoosedBtn.length == 9){
                    if(sumCpu != 3 && sumUser != 3){
                        flag = 'draw'; 
                    }
                    break;
                }
            }

            //----------It shows who's the winner----------
            switch(flag){
                case 'user':
                    setTimeout(() => {
                        playerpoint ++;
                        playerScore.innerHTML = playerpoint; 
                        r.style.setProperty('--user-symbol', 'none');
                        resultPanel.style.display = 'flex';
                        arr.disabled = true;
                        clearTimeout(playingTimeout);
                        clearTimeout(chanceTime);
                        if(playerSelection == 'circle'){
                                resultDeclarationHead.style.color = '#f2b137';
                                resultImg.src = './Images/Circle-logo.svg';
                        }
                        else if(playerSelection == 'cross'){
                                resultDeclarationHead.style.color = '#31c3bd';
                                resultImg.src = './Images/Cross-logo.svg';
                        }
                    }, 500);
                    break;
            
                case 'cpu':
                    setTimeout(() => {
                        cpupoint ++;
                        cpuScore.innerHTML = cpupoint;
                        resultPanel.style.display = 'flex';
                        resultHead.innerHTML = 'You Lost!'
                        r.style.setProperty('--user-symbol', 'none');
                        arr.disabled = true;
                        if(playerSelection == 'circle'){
                            resultDeclarationHead.style.color = '#31c3bd';
                            resultImg.src = './Images/Cross-logo.svg';
                        }
                        else if(playerSelection == 'cross'){
                            resultDeclarationHead.style.color = '#f2b137';
                            resultImg.src = './Images/Circle-logo.svg';
                        }
                    }, 3500);
                    break;
            
                case 'draw':
                    if(playerSelection == 'circle'){
                        setTimeout(() => {
                            resultPanel.style.display = 'flex';
                            tiespoint ++;
                            tiesScore.innerHTML = tiespoint;
                        }, 3500);
                    }
                    else if(playerSelection == 'cross'){
                        setTimeout(() => {
                            resultPanel.style.display = 'flex';
                            tiespoint ++;
                            tiesScore.innerHTML = tiespoint;           
                        }, 500);
                    }
                    setTimeout(() => {
                        resultHead.innerHTML = 'Match Draw!';
                        arr.disabled = true;
                        resultDeclarationHead.innerHTML = 'Its a Draw';
                        resultImg.src = 'none';
                    }, 500);
            }
        })   
    })

    //----------Result Area button functions----------
    quit.addEventListener('click', () =>{
        playerpoint = 0;
        tiespoint = 0;
        cpupoint = 0;
        localStorage.setItem('playerpoint', playerpoint);
        localStorage.setItem('tiespoint', tiespoint);
        localStorage.setItem('cpupoint', cpupoint);
        location.reload(true);
    })
    nextRound.addEventListener('click', () => {
        resultContainer.style.animation = 'closing 0.5s ease-in-out';
        setTimeout(() => {
            resultPanel.style.display = 'none';

            localStorage.setItem('playerpoint', playerpoint);
            localStorage.setItem('tiespoint', tiespoint);
            localStorage.setItem('cpupoint', cpupoint);
            location.reload(true);

        }, 500);
    })
})