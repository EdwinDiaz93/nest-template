import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({
    name: 'products'
})
export class Product {
    @ApiProperty({
        example: '11914e77-d812-4298-b49f-1626846d0d5a',
        description: 'Product ID',
        uniqueItems: true,
        nullable: false,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty()
    @Column('float', {
        default: 0,
    })
    price: number;

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ApiProperty()
    @Column({
        type: 'text',
        unique: true,
    })
    slug: string;

    @ApiProperty()
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty()
    @Column({
        type: 'text',
        array: true,
        default: [],
    })
    sizes: string[];

    @ApiProperty()
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column({
        type: 'text',
        array: true,
        default: [],
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user: User) => user.products,
        { eager: true },
    )
    user: User


    @BeforeInsert()
    @BeforeUpdate()
    checkSlugInsert() {
        if (!this.slug) this.slug = this.title;

        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

}
