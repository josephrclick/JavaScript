const roleMineralHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        /*
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS,
            { filter: (s) => { return s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 } });
        const extension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            { filter: (e) => { return e.structureType == STRUCTURE_EXTENSION && e.store.getFreeCapacity(RESOURCE_ENERGY) > 0 } });
        const tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            { filter: (t) => { return t.structureType == STRUCTURE_TOWER && t.store.getFreeCapacity(RESOURCE_ENERGY) > 0 } });
        */

        const extractor = Game.getObjectById(creep.memory.extractor);
        const mineral = Game.getObjectById(creep.memory.mineral);
        const storage = creep.room.storage;

        //mineral = creep.pos.findClosestByPath(FIND_MINERALS);
        //console.log(mineral.mineralType);

        if ((creep.store.getFreeCapacity(RESOURCE_HYDROGEN) == 0 && !creep.memory.working) || creep.ticksToLive < 60) {
            creep.memory.working = true;
            // creep.say('⚡ transfer');
        } else if (creep.store[RESOURCE_HYDROGEN] == 0) {
            creep.memory.working = false;
            //  creep.say('🔄 harvest');
        }

        if (!creep.memory.working) {
            if (extractor.cooldown == 0) {
                if (creep.harvest(mineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mineral, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
        /*
        const containerEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES,
            { filter: (c) => { return c.structureType == STRUCTURE_CONTAINER && c.store[RESOURCE_ENERGY] > 100 } });
        if (containerEnergy) {
            
             const droppedEnergy = containerEnergy.pos.lookFor(LOOK_RESOURCES);
                 if (droppedEnergy.length) {
                     console.log(creep.pickup(droppedEnergy[0]));
                      if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                          creep.moveTo(droppedEnergy[0]);
                      }
        } else if (creep.withdraw(containerEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containerEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        
        } else if (source) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
     } 
     */

        else {
            if (creep.transfer(storage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }

        /*
           else if (!creep.memory.working && creep.room.energyAvailable == creep.room.energyCapacityAvailable && extractor) {
           }        
            else if (tower && tower.store[RESOURCE_ENERGY] < 100) {
               if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(tower, { visualizePathStyle: { stroke: '#ffaa00' } })
               }; 
           } else if (extension) {
               if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(extension, { visualizePathStyle: { stroke: '#ffaa00' } })
               };
           } else if (spawn) {
               if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffaa00' } })
               };
           } else if (tower && tower.store[RESOURCE_ENERGY] < 700) {
               if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(tower, { visualizePathStyle: { stroke: '#ffaa00' } })
               };
           } else if (storage) {
               if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } })
               };
            } else if (tower) {
               if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(tower, { visualizePathStyle: { stroke: '#ffaa00' } })
               };
           } 
           */
    }
};

module.exports = roleMineralHarvester;