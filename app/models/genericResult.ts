import { GenericResultBase } from './genericResultBase'

export class GenericResult<TResult> extends GenericResultBase{
    public result: TResult;
}