export interface IUseCase<Input, Output> {
    // endStatus: StatusCode;
    execute(input: Input): Promise<Output>;
}
