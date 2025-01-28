import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){};

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations:{
                produto: true
            }
        });
    };

    async findById(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations:{
                produto: true
            }
        })

        if(!categoria)
            throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND)
        return categoria;
    };

    async findByTitulo(titulo: string): Promise<Categoria[]> {
        const categorias = await this.categoriaRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                produto: true
            }
        });
    
        if (!categorias || categorias.length === 0) {
            throw new HttpException('Categoria não encontrada com o título informado!', HttpStatus.NOT_FOUND);
        }
    
        return categorias;
    };

    async findByDescricao(descricao: string): Promise<Categoria[]> {
        const categorias = await this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                produto: true
            }
        });
    
        if (!categorias || categorias.length === 0) {
            throw new HttpException('Categoria não encontrada com a descrição informada!', HttpStatus.NOT_FOUND);
        }
    
        return categorias;
    };

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    };

    async update(categoria: Categoria): Promise<Categoria> {
        await this.findById(categoria.id)
        return await this.categoriaRepository.save(categoria);
    };

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.categoriaRepository.delete(id)
    };

}