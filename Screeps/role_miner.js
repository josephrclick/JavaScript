const roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {

        const container = Game.getObjectById(creep.memory.mineId);

        if (creep.pos.isEqualTo(container)) {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            creep.harvest(source);
        } else {
            creep.moveTo(container);
        }

        if (creep.ticksToLive === 44) {
            creep.room.memory.spawnMiner = true;
            creep.room.memory.spawnMinerId = creep.memory.mineId;
            console.log(`${creep.ticksToLive}: ${creep.room.memory.spawnMiner}, ${creep.room.memory.spawnMinerId}`);
            console.log(`${creep.ticksToLive}: ${Game.rooms['E13S46'].memory.spawnMiner}, ${Game.rooms['E13S46'].memory.spawnMinerId}`);
        }
    }
};

module.exports = roleMiner;