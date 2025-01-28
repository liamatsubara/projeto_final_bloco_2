import { Transform, TransformFnParams } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NumericTransformer } from "../../util/numerictransformer";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"})
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 1000})
    descricao: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Min(0)
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number;

    @IsNotEmpty()
    @Column({type: 'int', nullable: false})
    quantidade: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 500, nullable: false})
    foto: string;

    @CreateDateColumn()
    data_criacao: Date;

    @UpdateDateColumn()
    data_atualizacao: Date;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;

}