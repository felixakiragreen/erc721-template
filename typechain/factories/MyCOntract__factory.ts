/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MyCOntract, MyCOntractInterface } from "../MyCOntract";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "by",
        type: "uint256",
      },
    ],
    name: "countUp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101dd806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063da28179e14610030575b600080fd5b61004a600480360381019061004591906100a5565b610060565b60405161005791906100e1565b60405180910390f35b600080821161006e57600080fd5b8160008082825461007f91906100fc565b925050819055506000549050919050565b60008135905061009f81610190565b92915050565b6000602082840312156100bb576100ba61018b565b5b60006100c984828501610090565b91505092915050565b6100db81610152565b82525050565b60006020820190506100f660008301846100d2565b92915050565b600061010782610152565b915061011283610152565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156101475761014661015c565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b61019981610152565b81146101a457600080fd5b5056fea2646970667358221220e21cc2d9a1e905b093c7e776333c7ed803cd61f25065ed6a1fe8efa5215e4b8a64736f6c63430008060033";

export class MyCOntract__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MyCOntract> {
    return super.deploy(overrides || {}) as Promise<MyCOntract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MyCOntract {
    return super.attach(address) as MyCOntract;
  }
  connect(signer: Signer): MyCOntract__factory {
    return super.connect(signer) as MyCOntract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyCOntractInterface {
    return new utils.Interface(_abi) as MyCOntractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MyCOntract {
    return new Contract(address, _abi, signerOrProvider) as MyCOntract;
  }
}
