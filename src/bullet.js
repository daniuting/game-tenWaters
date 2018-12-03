export default class bullet {
    constructor (parent, water, type) {
        this.parent = parent;
        this.type = type;
        this.bullet = document.createElement('div');
        this.bullet.classList.add('bullet');
        this.bullet.classList.add(this.type);
        this.isDestoryed = false;

        switch (type) {
            case 'left':
                this.left = water.left - 50;
                this.top = water.top;
                break;
            case 'right':
                this.left = water.left + 50;
                this.top = water.top;
                break;
            case 'top':
                this.left = water.left;
                this.top = water.top - 50;
                break;
            case 'bottom':
                this.left = water.left;
                this.top = water.top + 50;
                break;
        }
        
        this.bullet.style.left = this.left + 'px';
        this.bullet.style.top = this.top + 'px';
        parent.wrap.appendChild(this.bullet);
        this.move();
    }

    move () {
        const wrap = this.parent.wrap;
        this.run = setInterval (() => {
            switch (this.type) {
                case 'left':
                    this.left = this.left - 8;
                    break;
                case 'right':
                    this.left = this.left + 8;
                    break;
                case 'top':
                    this.top = this.top - 8;
                    break;
                case 'bottom':
                    this.top = this.top + 8;
                    break;
            }
            
            this.bullet.style.left = this.left + 'px';
            this.bullet.style.top = this.top + 'px';
            this.parent.bulletRun(this);

            if (this.left < - 100 
                || this.left > wrap.offsetWidth
                || this.top < - 100
                || this.top > wrap.offsetHeight
            ) {
                this.remove();
            }
        }, 16);
    }

    remove () {
        clearInterval(this.run);
        this.bullet.remove();
        this.isDestoryed = true;

        let isSuccess = this.parent.waterArray.every(item => {
            return item.level === 0;
        });
        let bulletLength = this.parent.bulletArray.filter(item => !item.isDestoryed).length;
        if (!bulletLength && this.parent.water === 0 && !isSuccess) {
            alert('你输了！');
        } else if (isSuccess && !bulletLength) {
            alert('你赢了！');
        }
    }
}