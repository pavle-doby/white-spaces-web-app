import { KeyValue } from '@angular/common';

export class KeyValuePair<K, V> {
  public key: K;
  public value: V;

  constructor(obj: KeyValuePair<K, V> | KeyValue<K, V>) {
    this.key = obj.key;
    this.value = obj.value;
  }
}
