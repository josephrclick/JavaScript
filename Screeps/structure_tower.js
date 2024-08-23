const structureTower = {

    /**
     * 
     * @param {structureTower} tower 
     */

    run: function (tower) {

        if (tower.store[RESOURCE_ENERGY] > 0) {

            const needsRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (n) => {
                    return (n.my || n.structureType == STRUCTURE_CONTAINER || n.structureType == STRUCTURE_ROAD)
                        && n.structureType != STRUCTURE_RAMPART && n.hits < n.hitsMax
                }
            });
            const injuredCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (o) { return o.hits < o.hitsMax }
            });
            const enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        /*    const killWall = Game.getObjectById('5f7886cb221838da9399f6ce');
            if (killWall) {
                tower.attack(killWall);
            }*/
            if (enemy) {
                tower.attack(enemy);
                console.log(`Tower is Attacking ${enemy}`);
            } else if (injuredCreep) {
                tower.heal(injuredCreep);
                console.log(`Tower is Healing ${injuredCreep}`);
            } else if (needsRepair) {
                tower.repair(needsRepair);
                // console.log(`Tower is Repairing ${needsRepair}`);
            } else if (Game.time % 20 == 0) {
                const veryDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (v) => { return v.structureType == STRUCTURE_WALL && v.hits < v.hitsMax * 0.0001 }
                });
                const damagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (d) => { return d.structureType == STRUCTURE_WALL && d.hits < d.hitsMax * 0.05 }
                });
                const damagedRampart = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (d) => { return d.structureType == STRUCTURE_RAMPART && d.hits < d.hitsMax * 0.25 }
                });
                if (veryDamagedWall) {
                    tower.repair(veryDamagedWall);
                } else if (damagedRampart) {
                    tower.repair(damagedRampart);
                    //  console.log(`Tower is Repairing ${damagedRampart}`);
                } else if (damagedWall) {
                    tower.repair(damagedWall);
                    // console.log(`Tower is Repairing ${damagedWall}`);
                }
            }
        }
    }
};

module.exports = structureTower;