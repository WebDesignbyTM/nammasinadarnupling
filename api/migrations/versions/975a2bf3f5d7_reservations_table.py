"""reservations table

Revision ID: 975a2bf3f5d7
Revises: d749f1ed02ce
Create Date: 2020-04-01 05:12:16.465595

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '975a2bf3f5d7'
down_revision = 'd749f1ed02ce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reservation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reservation_date'), 'reservation', ['date'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_reservation_date'), table_name='reservation')
    op.drop_table('reservation')
    # ### end Alembic commands ###
