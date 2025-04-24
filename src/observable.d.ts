interface EventTarget {
  when<E = Event>(eventName: string): Observable<E>;
}

type SubscribeCallback<T> = (subscriber: Subscriber<T>) => void;
type ObservableSubscriptionCallback<T> = (value: T) => void;

type ObservableInspectorAbortHandler<T> = (value: T) => void;

type Predicate<T> = (value: T, index: number) => boolean;
type Reducer = (accumulator: any, currentValue: any, index: number) => any;
type Mapper<T, U> = (value: T, index: number) => U;
type Visitor<T> = (value: T, index: number) => void;

type CatchCallback<T> = (value: unknown) => Observable<T>;

interface Subscriber<T> {
  next(value: T): void;
  error(error: unknown): void;
  complete(): void;
  addTeardown(teardown: VoidFunction): void;

  readonly active: boolean;
  readonly signal: AbortSignal;
}

interface SubscriptionObserver<T> {
  next?: ObservableSubscriptionCallback<T>;
  error?: ObservableSubscriptionCallback<T>;
  complete?: VoidFunction;
}

interface ObservableInspector<T> {
  next: ObservableSubscriptionCallback<T>;
  error: ObservableSubscriptionCallback<T>;
  complete: VoidFunction;

  subscribe: VoidFunction;
  abort: ObservableInspectorAbortHandler<T>;
}

type ObserverUnion<T> =
  | ObservableSubscriptionCallback<T>
  | SubscriptionObserver<T>;
type ObservableInspectorUnion<T> =
  | ObservableSubscriptionCallback<T>
  | ObservableInspector<T>;

interface SubscribeOptions {
  signal: AbortSignal;
}

declare class Observable<T> {
  constructor(callback: SubscribeCallback<T>);

  subscribe(observer?: ObserverUnion<T>, options?: SubscribeOptions): void;

  static from<T>(value: T[]): Observable<T>;

  takeUntil(value: any): Observable;
  map<U>(mapper: Mapper<T, U>): Observable<U>;
  filter(predicate: Predicate<T>): Observable<T>;
  take(amount: number): Observable<T>;
  drop(amount: number): Observable<T>;
  flatMap<U>(mapper: Mapper<T, U>): Observable<U>;
  switchMap<U>(mapper: Mapper<T, U>): Observable<U>;
  inspect(inspectorUnion?: ObservableInspectorUnion<T>): Observable<T>;
  catch<U>(callback: CatchCallback<U>): Observable<T | U>;
  finally(callback: VoidFunction): Observable<T>;

  toArray(options?: SubscribeOptions): Promise<T[]>;
  forEach(callback: Visitor, options?: SubscribeOptions): Promise<void>;
  every(predicate: Predicate<T>, options?: SubscribeOptions): Promise<boolean>;
  first(options?: SubscribeOptions): Promise<T>;
  last(options?: SubscribeOptions): Promise<T>;
  find(predicate: Predicate<T>, options?: SubscribeOptions): Promise<T>;
  some(predicate: Predicate<T>, options?: SubscribeOptions): Promise<boolean>;
  reduce(
    reducer: Reducer,
    initialValue?: T,
    options?: SubscribeOptions
  ): Promise<T>;
}
