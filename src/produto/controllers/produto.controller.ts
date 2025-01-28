import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller("/produtos")
export class ProdutoController{

    constructor(
        private readonly produtoService: ProdutoService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo') titulo: string): Promise<Produto[]>{
        return this.produtoService.findByTitulo(titulo);
    }

    @Get('/menor_preco/:preco')
    @HttpCode(HttpStatus.OK)
    findByMenorPreco(@Param('preco') preco: number): Promise<Produto[]>{
        return this.produtoService.findByMenorPreco(preco);
    }

    @Get('/maior_preco/:preco')
    @HttpCode(HttpStatus.OK)
    findByMaiorPreco(@Param('preco') preco: number): Promise<Produto[]>{
        return this.produtoService.findByMaiorPreco(preco);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Produto: Produto): Promise<Produto>{
        return this.produtoService.create(Produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Produto: Produto): Promise<Produto>{
        return this.produtoService.update(Produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }

}
