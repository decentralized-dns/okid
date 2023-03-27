# json-rpc calls <!-- omit in toc -->

- [eth methods](#eth-methods)
  - [`eth_protocolVersion`](#eth_protocolversion)
  - [`eth_syncing`](#eth_syncing)
  - [`eth_gasPrice`](#eth_gasprice)
  - [`eth_accounts`](#eth_accounts)
  - [`eth_blockNumber`](#eth_blocknumber)
  - [`eth_chainId`](#eth_chainid)
  - [`eth_getBalance`](#eth_getbalance)
  - [eth\_getTransactionCount](#eth_gettransactioncount)


# eth methods

## `eth_protocolVersion`

```sh
$ curl -X POST --data '{
	"jsonrpc": "2.0",
	"method": "eth_protocolVersion",
	"params": [],
	"id": 1
}' -H "Content-Type: application/json" http://localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x1292da5"}
```

## `eth_syncing`

```sh
$ curl -X POST --data '{
        "jsonrpc": "2.0",
        "method": "eth_syncing",
        "params": [],
        "id": 1
}' -H "Content-Type: application/json" https://exchaintestrpc.okex.org/

{"jsonrpc":"2.0","id":1,"result":false}
```

## `eth_gasPrice`

```sh
$ curl -X POST --data '{
        "jsonrpc": "2.0",
        "method": "eth_gasPrice",
        "params": [],
        "id": 1
}' -H "Content-Type: application/json" https://exchaintestrpc.okex.org/
{"jsonrpc":"2.0","id":1,"result":"0x5f5e100"}
```

## `eth_accounts`

```sh
$ curl -X POST --data '{
        "jsonrpc": "2.0",
        "method": "eth_accounts",
        "params": [],
        "id": 1
}' -H "Content-Type: application/json" https://exchaintestrpc.okex.org/
{"jsonrpc":"2.0","id":1,"result":["0x0c739d21c89ab789513bf456a25950996f87d1a5"]}
```

## `eth_blockNumber`

```sh
$ curl -X POST --data '{
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": [],
        "id": 1
}' -H "Content-Type: application/json" https://exchaintestrpc.okex.org/
{"jsonrpc":"2.0","id":1,"result":"0x1292df4"}
```

## `eth_chainId`

```sh
$ curl -X POST --data '{
        "jsonrpc": "2.0",
        "method": "eth_chainId",
        "params": [],
        "id": 1
}' -H "Content-Type: application/json" https://exchaintestrpc.okex.org/
{"jsonrpc":"2.0","id":1,"result":"0x41"}
```

## `eth_getBalance`

Parameters
- Account Address
- Block Number

account can be retrieved from `eth_accounts` call, which is `0x0c739d21c89ab789513bf456a25950996f87d1a5`

```
$ curl -X POST --data '{
        "jsonrpc": "2.0",
        "method": "eth_getBalance",
        "params": ["0x0c739d21c89ab789513bf456a25950996f87d1a5", "0x0"],
        "id": 1
}' -H "Content-Type: application/json" https://exchaintestrpc.okex.org/
{"jsonrpc":"2.0","id":1,"result":"0xe205f5cca83d7400"}
```

## eth_getTransactionCount

curl -X POST --data '{
	"jsonrpc": "2.0",
	"method": "eth_getTransactionCount",
	"params": ["0x7bf7b17da59880d9bcca24915679668db75f9397", "0x0"],
	"id": 1
}' -H "Content-Type: application/json" http://localhost:8545
