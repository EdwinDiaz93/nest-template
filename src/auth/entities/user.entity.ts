import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../../products/entities/product.entity';

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @Column({
        type: 'text',
        array: true,
        default: ['user'],
    })
    roles: string[];


    @OneToMany(
        () => Product,
        (products: Product) => products.user
    )
    products: Product[]

    @BeforeInsert()
    @BeforeUpdate()
    checkFields() {
        this.email = this.email.toLocaleLowerCase();
    }

}
