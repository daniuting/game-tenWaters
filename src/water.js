import Bullet from './bullet'
export default class Water {
    constructor (parent) {
        this.width = 100;
        this.height = 100;
        this.parent = parent;
        this.wrap = parent.wrap;
        this.level = Math.floor(Math.random() * 5);

        const div = document.createElement('div');
        div.classList.add('water-polo');
        const img = document.createElement('img');
        img.src = `src/img/${this.level}.png`;
        this.img = img;
        div.appendChild(img);
        this.wrap.appendChild(div);

        this.left = div.offsetLeft;
        this.top = div.offsetTop;

        div.onclick = () => {
            if (this.level === 0 || this.parent.water === 0) {
                return;
            }
            this.update();
            this.parent.update(this);
        }

        this.img.addEventListener('animationend', () => {
            this.img.classList.remove('level-up');
        })
    }

    update () {
        if (this.level === 0) {
            return;
        }

        if (this.level === 4) {
            this.parent.bulletArray.push(new Bullet(this.parent, this, 'left'));
            this.parent.bulletArray.push(new Bullet(this.parent, this, 'right'));
            this.parent.bulletArray.push(new Bullet(this.parent, this, 'top'));
            this.parent.bulletArray.push(new Bullet(this.parent, this, 'bottom'));
            this.level = 0;
        } else {
            this.level++;
        }
        this.img.src = `src/img/${this.level}.png`;
        this.img.classList.add('level-up');
    }
} 