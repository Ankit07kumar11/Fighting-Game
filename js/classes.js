class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framemax = 1,
        offset = { x: 0, y: 0 }
    }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framemax = framemax
        this.currentframe = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.currentframe * (this.image.width / this.framemax),
            0,
            this.image.width / this.framemax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framemax) * this.scale,
            this.image.height * this.scale
        )

    }
    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.currentframe < this.framemax - 1) {
                this.currentframe++
            }
            else {
                this.currentframe = 0
            }

        }
    }

    update() {
        this.draw()

        this.animateFrames()


    }

}

class Fighter extends Sprite {
    constructor({ position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        framemax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackbox = {
            offset: {},
            width: undefined,
            height: undefined
        }
    }) {
        super({
            position,
            imageSrc,
            scale,
            framemax,
            offset

        })
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastkey
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackbox.offset,
            width: attackbox.width,
            height: attackbox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.currentframe = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead=false

        for (const sprite in sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }


    }



    update() {
        this.draw()
        if (this.dead ==false){
            this.animateFrames()
        }

        // attackbox position 

        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y

        // draw the attackbox 
        // c.fillRect(this.attackbox.position.x,this.attackbox.position.y,this.attackbox.width,this.attackbox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y = 330
        }
        else this.velocity.y += gravity
        // console.log(this.position.y)
    }
    attack() {
        this.switchSprites('attack1')
        this.isAttacking = true
    }
    takeHit() {
        
        this.health -= 20

        if (this.health<=0){
            this.switchSprites('death')
        }
        else{
            this.switchSprites('takeHit')
        }
    }
    switchSprites(sprite) {
        if (this.image === this.sprites.death.image){
            if (this.currentframe === this.sprites.death.framemax - 1) 
                this.dead=true
            return
        }
        // overriding all other animations with attack animation
        if (this.image === this.sprites.attack1.image && this.currentframe < this.sprites.attack1.framemax - 1) {
            return
        }

        // overriding all animation for takeHit animation
        if (this.image === this.sprites.takeHit.image &&
            this.currentframe < this.sprites.takeHit.framemax - 1) {
            return
        }
        switch (sprite) {
            case 'idle':
                if (this.image != this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framemax = this.sprites.idle.framemax
                    this.currentframe = 0
                }
                break

            case 'run':
                if (this.image != this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framemax = this.sprites.run.framemax
                    this.currentframe = 0
                }
                break

            case 'jump':
                if (this.image != this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.currentframe = 0
                    this.framemax = this.sprites.jump.framemax
                }
                break

            case 'fall':
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.currentframe = 0
                    this.framemax = this.sprites.fall.framemax
                }
                break


            case 'attack1':
                if (this.image != this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.currentframe = 0
                    this.framemax = this.sprites.attack1.framemax
                }
                break
            case 'takeHit':
                if (this.image != this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.currentframe = 0
                    this.framemax = this.sprites.takeHit.framemax
                }
                break
            case 'death':
                if (this.image != this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.currentframe = 0
                    this.framemax = this.sprites.death.framemax
                }
                break


        }

    }
}