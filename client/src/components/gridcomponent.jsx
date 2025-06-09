export default function GridOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:150px_150px]" />
        </div>
    );
}
