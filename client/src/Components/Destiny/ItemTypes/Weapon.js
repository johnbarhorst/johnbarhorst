import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToggle } from '../../../Hooks';
import InstanceStatsCard from '../InstanceStatsCard';
import Sockets from '../Sockets';
import LoreDisplay from '../LoreDisplay';
import { AmmoTypeImage, ItemWrapper, ItemIcon, ItemCard, DetailsCard, ElementTypeImage } from '../../../Elements';

const ammoTypePaths = {
  1: "/img/destiny_content/ammo_types/primary.png",
  2: "/img/destiny_content/ammo_types/special.png",
  3: "/img/destiny_content/ammo_types/heavy.png",
};

const damageTypePaths = {
  1: "/img/destiny_content/damage_types/kinetic.png",
  2: "/img/destiny_content/damage_types/arc.png",
  3: "/img/destiny_content/damage_types/thermal.png",
  4: "/img/destiny_content/damage_types/void.png",
}

const IMG_PATH = "https://www.bungie.net";

export const Weapon = ({ name, ammoType, itemTypeDisplayName, damageType, primaryStat, instanceStats, icon, masterwork, sockets, lore }) => {
  const [isExpanded, toggleExpanded] = useToggle(false, true);

  return (
    <ItemWrapper>
      <ItemCard onClick={() => toggleExpanded(isExpanded => !isExpanded)}>
        <ItemIcon src={IMG_PATH + icon} isMasterworked={masterwork} />
        <div>
          <p><strong>{name}</strong></p>
          <p>{itemTypeDisplayName}</p>
          <ElementTypeImage background={damageTypePaths[damageType]} />
        </div>
        <div style={{ textAlign: 'end' }}>
          <p>{primaryStat.name}</p>
          <p>{primaryStat.value}</p>
          <AmmoTypeImage background={ammoTypePaths[ammoType]} />
        </div>
      </ItemCard>
      <AnimatePresence>
        {isExpanded &&
          <DetailsCard
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InstanceStatsCard instanceStats={instanceStats} />
            <Sockets sockets={sockets} isExpanded={isExpanded} />
            <div>
              {lore && <LoreDisplay lore={lore} />}
            </div>
          </DetailsCard>}
      </AnimatePresence>
    </ItemWrapper>
  )
}

Weapon.whyDidYouRender = true;