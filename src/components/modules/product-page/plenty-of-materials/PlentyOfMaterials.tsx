import React, { useState } from 'react';
import Image from 'next/image';
import { Typography } from '@components/ui/typography/Typography';
import { MaterialsProcessingData } from '@my-types/product';
import styles from './PlentyOfMaterials.module.scss';

interface PlentyOfMaterialsProps {
    data: MaterialsProcessingData;
}

const PlentyOfMaterials: React.FC<PlentyOfMaterialsProps> = ({ data }) => {
    const [activeMaterialId, setActiveMaterialId] = useState<string>(data.materials[0]?.id || '');

    const activeMaterial = data.materials.find(m => m.id === activeMaterialId) || data.materials[0];

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <Typography tag="h2" size="xl" weight="bold" className={styles.title}>
                    {data.title.map((part, index) => (
                        <span key={index} style={{ color: part.color }}>
                            {part.text}
                        </span>
                    ))}
                </Typography>
            </div>

            <div className={styles.content}>
                <div className={styles.imagesContainer}>
                    <div className={styles.mainImageWrapper}>
                        {data.images[0] && (
                            <Image
                                src={data.images[0]}
                                alt="Main processing material"
                                fill
                                className={styles.mainImage}
                                priority
                            />
                        )}
                    </div>
                    <div className={styles.gridImagesWrapper}>
                        {data.images.slice(1, 5).map((img, index) => (
                            <div key={index} className={styles.gridImageWrapper}>
                                <Image
                                    src={img}
                                    alt={`Processing example ${index + 1}`}
                                    fill
                                    className={styles.gridImage}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.materialsLayout}>
                    <div className={styles.materialsGrid}>
                        {data.materials.map((material) => (
                            <div
                                key={material.id}
                                className={`${styles.materialCard} ${activeMaterialId === material.id ? styles.active : ''}`}
                                onClick={() => setActiveMaterialId(material.id)}
                            >
                                <div className={styles.materialIcon}>
                                    <Image
                                        src={material.icon || data.images[0]}
                                        alt={material.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles.materialInfo}>
                                    <Typography tag="h3" size="s" weight="semi-bold" className={styles.materialName}>
                                        {material.name}
                                    </Typography>
                                    <Typography tag="p" size="s" weight="semi-bold" className={styles.materialAction}>
                                        {material.action}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlentyOfMaterials;
