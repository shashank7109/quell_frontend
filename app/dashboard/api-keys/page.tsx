"use client";
import { useEffect, useState, FormEvent } from "react";
import { Plus, Copy, Trash2, Check, X, KeyRound } from "lucide-react";
import { keys as keysApi, type APIKey, type APIKeyCreated } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function APIKeysPage() {
  const [keyList, setKeyList] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdKey, setCreatedKey] = useState<APIKeyCreated | null>(null);
  const [copied, setCopied] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    keysApi
      .list()
      .then(setKeyList)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    setCreating(true);
    setError("");
    try {
      const key = await keysApi.create(newKeyName.trim());
      setCreatedKey(key);
      setKeyList((prev) => [
        {
          id: key.id,
          name: key.name,
          key_prefix: key.key_prefix,
          created_at: key.created_at,
          last_used_at: null,
          is_active: true,
        },
        ...prev,
      ]);
      setNewKeyName("");
      setShowCreate(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create key");
    } finally {
      setCreating(false);
    }
  }

  async function handleRevoke(id: number) {
    try {
      await keysApi.revoke(id);
      setKeyList((prev) =>
        prev.map((k) => (k.id === id ? { ...k, is_active: false } : k))
      );
    } catch {
      // silently fail
    } finally {
      setDeleteId(null);
    }
  }

  async function copyKey(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white">API Keys</h1>
          <p className="text-[#555] text-sm mt-0.5">
            Authenticate with the Quell API using these keys
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={14} />
          Create key
        </Button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <Card className="w-full max-w-md animate-slide-up" padding="lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold">Create API key</h2>
              <button
                onClick={() => { setShowCreate(false); setError(""); }}
                className="text-[#555] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                label="Key name"
                type="text"
                autoFocus
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g. CI / Production"
                error={error}
              />
              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => { setShowCreate(false); setError(""); }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={creating}
                  disabled={!newKeyName.trim()}
                >
                  Create
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Created key reveal modal */}
      {createdKey && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <Card className="w-full max-w-md animate-slide-up" padding="lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Check size={18} className="text-green-400" />
              <h2 className="text-white font-semibold">Key created</h2>
            </div>
            <p className="text-[#555] text-sm mb-5">
              Copy your API key now — it won&apos;t be shown again.
            </p>
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 flex items-center gap-3 mb-5">
              <code className="text-green-400 text-xs font-mono flex-1 break-all">
                {createdKey.full_key}
              </code>
              <button
                onClick={() => copyKey(createdKey.full_key)}
                className="text-[#555] hover:text-white transition-colors flex-shrink-0"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <Button variant="primary" size="md" fullWidth onClick={() => setCreatedKey(null)}>
              Done
            </Button>
          </Card>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <Card className="w-full max-w-sm animate-slide-up" padding="lg">
            <h2 className="text-white font-semibold mb-1.5">Revoke API key?</h2>
            <p className="text-[#555] text-sm mb-6">
              Any applications using this key will stop working immediately.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="md" fullWidth onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" size="md" fullWidth onClick={() => handleRevoke(deleteId)}>
                Revoke
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Keys table */}
      <Card padding="none" className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#555] text-sm">Loading…</div>
        ) : keyList.length === 0 ? (
          <div className="p-12 text-center">
            <KeyRound size={28} className="text-[#333] mx-auto mb-3" />
            <p className="text-[#555] text-sm mb-4">No API keys yet</p>
            <Button variant="primary" size="sm" onClick={() => setShowCreate(true)}>
              Create your first key
            </Button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider">Name</th>
                <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider">Key</th>
                <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider hidden md:table-cell">Created</th>
                <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider hidden md:table-cell">Last used</th>
                <th className="text-left text-[#444] font-medium px-6 py-3 text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {keyList.map((key, i) => (
                <tr
                  key={key.id}
                  className={`${i < keyList.length - 1 ? "border-b border-[#111]" : ""} hover:bg-[#0d0d0d] transition-colors`}
                >
                  <td className="px-6 py-4 text-white font-medium text-sm">{key.name}</td>
                  <td className="px-6 py-4">
                    <code className="text-[#555] font-mono text-xs">{key.key_prefix}</code>
                  </td>
                  <td className="px-6 py-4 text-[#555] text-sm hidden md:table-cell">{formatDate(key.created_at)}</td>
                  <td className="px-6 py-4 text-[#555] text-sm hidden md:table-cell">
                    {key.last_used_at ? formatDate(key.last_used_at) : "Never"}
                  </td>
                  <td className="px-6 py-4">
                    <Badge tone={key.is_active ? "success" : "default"} dot>
                      {key.is_active ? "Active" : "Revoked"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {key.is_active && (
                      <button
                        onClick={() => setDeleteId(key.id)}
                        className="text-[#444] hover:text-red-400 transition-colors"
                        title="Revoke"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <p className="text-[#333] text-xs mt-4">
        API keys are hashed and stored securely. The full key is only shown once at creation.
      </p>
    </div>
  );
}
