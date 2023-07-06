/// <reference types="node" />
import { EventEmitter } from 'events';
export interface IGitOptions {
    dir: string;
}
export declare class Git extends EventEmitter {
    protected options: IGitOptions;
    protected dir: string;
    constructor(options: IGitOptions);
    protected gitExec(cmd: string): Promise<string>;
    protected getDiffFileList(diffOptions?: string): Promise<string[]>;
    init(): Promise<string>;
    setDir(dir: string): void;
    clone(repository: string, dest: string, options?: {
        depth?: number;
    }): Promise<string>;
    checkout(branchName: string): Promise<string>;
    updateSubmodules(init?: boolean, recursive?: boolean): Promise<string>;
    commit(message: string, all?: boolean): Promise<string>;
    pull(remote?: string, options?: {
        branch?: string;
        rebase?: boolean;
    }): Promise<unknown>;
    push(remote?: string): Promise<unknown>;
    add(): Promise<string>;
    addRemote(name: string, url: string): Promise<string>;
    setRemote(name: string, url: string): Promise<string>;
    merge(branchName: string, mergeOptions?: string): Promise<string>;
    fetch(): Promise<string>;
    reset(): Promise<string>;
    getHash(fileName: string): Promise<unknown>;
    diffMaster(fileName: string): Promise<string>;
    getBranchName(): Promise<unknown>;
    createBranch(branchName: string): Promise<string>;
    deleteBranch(branchName: string): Promise<string>;
    getDiffByRevisionFileList(revision: string): Promise<string[]>;
    getConflictList(): Promise<string[]>;
    getUncommittedList(): Promise<string[]>;
    getLastChanges(): Promise<unknown>;
    removeLocalBranch(branchName: string): Promise<string>;
    removeRemoteBranch(branchName: string): Promise<string>;
    getLocalBranchList(): Promise<unknown>;
    getRemoteBranchList(): Promise<unknown>;
    getRemotes(): Promise<string[]>;
    getRemoteUrl(name: string): Promise<string>;
    getTimeOfLastCommit(branchName: string): Promise<unknown>;
    getHashOfLastCommit(branchName: string): Promise<unknown>;
}
