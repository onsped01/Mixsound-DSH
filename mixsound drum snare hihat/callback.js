class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.currenKick = './allsound/kick-808.wav';
        this.currenSnare = './allsound/snare-big.wav';
        this.currenHihat = './allsound/hihat-808.wav';
        this.selects  = document.querySelectorAll('select');
        this.isPlaying = null;
        this.index = 0;
        this.bpm  = 180;
    }
    activePad(){
        this.classList.toggle('active');
    }

    repeat(){
        let step = this.index % 8;
        const activeBar = document.querySelectorAll(`.b${step}`);
        //Loop over the pads
        activeBar.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
        if (bar.classList.contains('active')) {
        if (bar.classList.contains('kick-pad')){
            this.kickAudio.currentTime = 0;
            this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')){
            this.snareAudio.currentTime = 0;
            this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')){
            this.hihatAudio.currentTime = 0;
            this.hihatAudio.play();
        }
        }
        });
        this.index++;
    }
    start(){
        const interval = (60 / this.bpm) *1000;
        //Check interval 
        if (!this.isPlaying){
            this.isPlaying = setInterval(() => {
            this.repeat();       
            }, interval);
        }else {
            clearInterval(this.isPlaying);
            console.log(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn(){
        if (!this.isPlaying){
            this.playBtn.innerHTML = 'Stop';
            this.playBtn.classList.add =('active');
        }else {
            this.playBtn.innerHTML = 'Start';
            this.playBtn.classList.remove = ('active');
        }
    }    
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName) {
            case 'kick-select':
            this.kickAudio.src = selectionValue;
            break;

            case 'snare-select':
            this.snareAudio.src = selectionValue;
            break;

            case 'hihat-select':
            this.hihatAudio.src = selectionValue;
            break;
        }
}
}

const drumKit = new Drumkit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click',drumKit.activePad);
    pad.addEventListener('animationend',function(){
        this.style.animation = "";
    });
    
});

drumKit.playBtn.addEventListener('click',() => {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});