import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";


@Entity({name: "tb_categorias"})
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string;

    @UpdateDateColumn()
    data: Date;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];
    
}