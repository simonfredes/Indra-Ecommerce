import CreateProductForm from '@/components/CreateProductForm'
export default function Create() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CreateProductForm name={''} price={0} image={''}/>
        </div>
    );
}