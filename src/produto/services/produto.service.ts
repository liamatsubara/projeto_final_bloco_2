import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService 
    ){}

    async findAll(): Promise<Produto[]>{
        return this.produtoRepository.find({
            relations:{
                categoria: true
            }
        }); 
    }

    async findById(id: number): Promise<Produto>{
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations:{
                categoria: true
            }
        })

        if(!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)
        return produto;
    }

    async findByTitulo(titulo: string): Promise<Produto[]> {
        const produtos = await this.produtoRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                categoria: true
            }
        });
    
        if (!produtos || produtos.length === 0) {
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }
    
        return produtos;
    }

    async findByMenorPreco(preco: number): Promise<Produto[]>{
       return await this.produtoRepository.find({
            where: {
                preco: LessThan(preco)
            },
            order: {
                preco: 'ASC'
            }
        })
    }

    async findByMaiorPreco(preco: number): Promise<Produto[]>{
        return await this.produtoRepository.find({
             where: {
                 preco: MoreThan(preco)
             },
             order: {
                 preco: 'ASC'
             }
         })
     }

     async create(produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto)
     }

     async update(produto: Produto): Promise<Produto>{
        await this.findById(produto.id)
        return await this.produtoRepository.save(produto)
     }

     async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.produtoRepository.delete(id)
    }

    
}