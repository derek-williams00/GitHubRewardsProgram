import RoleButton from '../component/RoleButton';

const RoleSelection = () => {
  return (
    <div>
      <div className="font-semibold mb-6">What is your role for your project?</div>
      <div>
        <RoleButton link={'admin'}>Admin</RoleButton>
        <RoleButton link={'contributor'}>Contributor</RoleButton>
      </div>
    </div>
  );
};

export default RoleSelection;
