import Water from './water';

export default {
    water: 10,

    wrap: null,

    waterArray: [],

    bulletArray: [],

    start () {
        const waterCount = document.getElementById('txt');
        this.waterCount = waterCount;
        const waterWrap = document.getElementById('value');
        this.waterWrap = waterWrap;
        this.wrap = document.getElementById('wrap');

        waterCount.innerHTML = this.water;
        waterWrap.style.height = `${this.water * 10}%`

        for (let i = 0; i < 36; i++) {
            let water = new Water(this);
            this.waterArray.push(water)
        }
    },
    update (water) {
        console.log(water)
        this.water--;
        this.waterCount.innerHTML = this.water;
        this.waterWrap.style.height = `${this.water * 10}%`;
        
        let bulletLength = this.bulletArray.filter(item => !item.isDestoryed).length;
        if (!bulletLength && this.water === 0) {
            alert('你输了！');
        }
    },
    
    bulletRun (bullet) {
        for (let item of this.waterArray) {
            if (bullet.type === 'left' || bullet.type === 'right') {
                if (item.top !== bullet.top) continue;
            }

            if (bullet.type === 'top' || bullet.type === 'bottom') {
                if (item.left !== bullet.left) continue;
            }

            let waterCenter = [item.left + 50, item.top + 50];
            let bulletCenter = [bullet.left + 50, bullet.top + 50];

            if (Math.abs(waterCenter[0] - bulletCenter[0]) < 10 && Math.abs(waterCenter[1] - bulletCenter[1]) < 10) {
                let level = item.level;
                item.update(bullet);

                if (level !== 0) {
                    bullet.remove();
                    break;
                }
            }
        }
    }
}